# Mobile Responsive Implementation

## Quick Start

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the frontend directory:
   ```
   WEBHOOK_SECRET=your-secret-key-here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Test mobile layouts**:
   - Open browser dev tools
   - Switch to mobile viewport
   - Test at breakpoints: 360×800, 375×812, 414×896, 768×1024

## Features

### Responsive Hooks
- `useWindowSize()`: Tracks window dimensions (SSR-safe)
- `useIsMobile()`: Detects mobile viewport (<768px by default)

### Mobile Issue Detection
- Automatic detection of layout issues
- Webhook reporting system
- Manual issue reporting capability

### Mobile-Specific Improvements
- Hamburger menu navigation
- Touch-friendly tap targets (≥44px)
- Responsive text and image sizing
- Optimized animations for mobile
- Horizontal scroll prevention

## File Structure

```
frontend/
├── src/
│   ├── hooks/
│   │   ├── useWindowSize.ts
│   │   └── useIsMobile.ts
│   └── utils/
│       └── mobileReporting.ts
├── app/
│   ├── api/webhooks/mobile-issue/
│   │   └── route.ts
│   ├── page.tsx (modified)
│   └── globals.css (modified)
├── MOBILE_TEST_PLAN.md
├── MOBILE_RESPONSIVE_PR.md
└── MOBILE_README.md
```

## Testing

See `MOBILE_TEST_PLAN.md` for detailed testing procedures.

## Browser Support

- Chrome (mobile)
- Safari (iOS)
- Firefox (mobile)
- Edge (mobile)

## Performance

- SSR-safe implementation
- Optimized mobile animations
- Responsive image loading
- Efficient hook implementations

## Troubleshooting

### Common Issues

1. **Hydration mismatch**: Ensure hooks check for `typeof window === 'undefined'`
2. **Mobile menu not working**: Check JavaScript console for errors
3. **Layout issues**: Check mobile issue reporting webhook logs

### Debug Mode

Enable debug logging by adding to your component:
```javascript
const { isMobile } = useIsMobile();
console.log('Is mobile:', isMobile);
```

## Contributing

When making mobile changes:
1. Only modify mobile-specific code paths
2. Preserve desktop functionality
3. Test at all specified breakpoints
4. Update mobile issue detection if needed
