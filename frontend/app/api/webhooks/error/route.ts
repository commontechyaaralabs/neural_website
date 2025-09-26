import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET = process.env.WEBHOOK_SECRET || 'default-secret-change-in-production';
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // Moderate limit for error reporting

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface ErrorPayload {
  error: {
    name: string;
    message: string;
    stack?: string;
    code?: string;
  };
  context: {
    url?: string;
    userAgent?: string;
    timestamp?: string;
    userId?: string;
    sessionId?: string;
    page?: string;
    component?: string;
    action?: string;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  clientId?: string;
}

const SEVERITY_LEVELS = ['low', 'medium', 'high', 'critical'] as const;

function validatePayload(payload: any): payload is ErrorPayload {
  return (
    typeof payload === 'object' &&
    typeof payload.error === 'object' &&
    typeof payload.error.name === 'string' &&
    typeof payload.error.message === 'string' &&
    typeof payload.context === 'object' &&
    typeof payload.severity === 'string' &&
    SEVERITY_LEVELS.includes(payload.severity)
  );
}

function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientId);
  
  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  clientData.count++;
  return true;
}

function timingSafeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, 'utf8');
  const bBuf = Buffer.from(b, 'utf8');
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function generateClientId(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  return crypto.createHash('sha256').update(`${ip}-${userAgent}`).digest('hex').substring(0, 16);
}

async function processError(errorData: ErrorPayload) {
  const timestamp = errorData.context.timestamp || new Date().toISOString();
  
  // Log the error with appropriate level
  const logData = {
    error: {
      name: errorData.error.name,
      message: errorData.error.message,
      code: errorData.error.code,
      stack: errorData.error.stack?.substring(0, 1000) // Truncate stack for logging
    },
    context: {
      url: errorData.context.url,
      userAgent: errorData.context.userAgent?.substring(0, 200), // Truncate for logging
      userId: errorData.context.userId,
      sessionId: errorData.context.sessionId,
      page: errorData.context.page,
      component: errorData.context.component,
      action: errorData.context.action
    },
    severity: errorData.severity,
    clientId: errorData.clientId,
    timestamp
  };
  
  // Log based on severity
  switch (errorData.severity) {
    case 'critical':
      console.error('CRITICAL ERROR:', logData);
      // TODO: Send immediate alert to on-call team
      break;
    case 'high':
      console.error('HIGH SEVERITY ERROR:', logData);
      // TODO: Send alert to development team
      break;
    case 'medium':
      console.warn('MEDIUM SEVERITY ERROR:', logData);
      // TODO: Log to monitoring service
      break;
    case 'low':
      console.log('LOW SEVERITY ERROR:', logData);
      // TODO: Log to analytics
      break;
  }
  
  // TODO: Implement actual error processing
  // Examples:
  // - Send to error monitoring service (Sentry, Bugsnag, etc.)
  // - Create support tickets for high/critical errors
  // - Update error tracking database
  // - Send notifications to appropriate teams
  // - Generate error reports
}

export async function POST(request: Request) {
  const clientId = generateClientId(request);
  
  try {
    // Rate limiting
    if (!checkRateLimit(clientId)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const raw = await request.text();
    
    // Validate content type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    // Parse and validate payload
    let body: any;
    try {
      body = JSON.parse(raw);
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    if (!validatePayload(body)) {
      return NextResponse.json(
        { 
          error: 'Invalid payload structure',
          requiredFields: {
            error: { name: 'string', message: 'string', stack: 'string (optional)', code: 'string (optional)' },
            context: { url: 'string (optional)', userAgent: 'string (optional)', timestamp: 'string (optional)', userId: 'string (optional)', sessionId: 'string (optional)', page: 'string (optional)', component: 'string (optional)', action: 'string (optional)' },
            severity: 'low | medium | high | critical'
          }
        },
        { status: 400 }
      );
    }

    // Optional signature validation (if secret is provided)
    if (SECRET && SECRET !== 'default-secret-change-in-production') {
      const signature = request.headers.get('x-signature') || '';
      const computed = crypto.createHmac('sha256', SECRET).update(raw).digest('hex');
      
      if (!signature || !timingSafeEqual(signature, computed)) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    // Process the error
    const errorData: ErrorPayload = {
      ...body,
      context: {
        ...body.context,
        timestamp: body.context?.timestamp || new Date().toISOString()
      },
      clientId
    };

    await processError(errorData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Error reported successfully',
      errorId: crypto.randomUUID(),
      severity: errorData.severity
    });
    
  } catch (error) {
    console.error('Error processing error webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    supportedSeverities: SEVERITY_LEVELS
  });
}
