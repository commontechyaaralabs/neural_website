// frontend/src/utils/mobileReporting.ts

export interface MobileIssueDetails {
  page: string;
  width: number;
  height: number;
  userAgent?: string;
  steps?: string;
  timestamp?: string;
  url?: string;
}

export async function reportMobileIssue(details: MobileIssueDetails): Promise<boolean> {
  try {
    const payload = {
      ...details,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'unknown'
    };

    const response = await fetch('/api/webhooks/mobile-issue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Note: Signature should be computed server-side for security
        // This is a simplified version for client-side reporting
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to report mobile issue:', error);
    return false;
  }
}

// Helper function to detect common mobile layout issues
export function detectMobileIssues(): MobileIssueDetails | null {
  if (typeof window === 'undefined') return null;

  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Check for horizontal overflow
  const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;
  
  // Check for very small tap targets (buttons/links smaller than 44px)
  const smallTapTargets = Array.from(document.querySelectorAll('button, a, input, select'))
    .filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width < 44 || rect.height < 44;
    }).length;

  if (hasHorizontalOverflow || smallTapTargets > 0) {
    return {
      page: window.location.pathname,
      width,
      height,
      userAgent: navigator.userAgent,
      steps: `Issues detected: ${hasHorizontalOverflow ? 'horizontal overflow' : ''} ${smallTapTargets > 0 ? `${smallTapTargets} small tap targets` : ''}`.trim()
    };
  }

  return null;
}
