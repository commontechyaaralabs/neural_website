# Mobile Layout Test Plan

## Overview
This document outlines the testing procedures for the mobile-responsive implementation of TheNeural website.

## Test Breakpoints
Test the following viewport sizes:
- **360×800** (small mobile)
- **375×812** (iPhone SE/12 mini)
- **414×896** (large phone)
- **768×1024** (tablet)

## Manual Testing Steps

### 1. Header Navigation
- [ ] **Desktop (≥1024px)**: Original navigation bar displays correctly
- [ ] **Mobile (<768px)**: Hamburger menu appears with "TheNeural" logo
- [ ] **Mobile**: Clicking hamburger toggles mobile menu dropdown
- [ ] **Mobile**: All navigation links are accessible and have proper tap targets (≥44px)
- [ ] **Mobile**: Menu closes when clicking outside or on a link

### 2. Hero Section
- [ ] **Desktop**: Original layout with side-by-side content and image
- [ ] **Mobile**: Content stacks vertically with proper spacing
- [ ] **Mobile**: Logo size adjusts appropriately
- [ ] **Mobile**: Heading text wraps properly and doesn't overflow
- [ ] **Mobile**: Image scales correctly without horizontal overflow

### 3. Story Cards Section
- [ ] **Desktop**: Original rounded pill-shaped cards
- [ ] **Mobile**: Cards use smaller border radius (rounded-3xl)
- [ ] **Mobile**: Text sizes adjust for readability
- [ ] **Mobile**: Center logo appears and scales appropriately
- [ ] **Mobile**: No horizontal scrolling

### 4. Thought Leadership Section
- [ ] **Desktop**: Original two-column layout
- [ ] **Mobile**: Content stacks vertically
- [ ] **Mobile**: Text sizes are readable
- [ ] **Mobile**: Image scales properly

### 5. Team Section
- [ ] **Desktop**: Four-column grid layout
- [ ] **Mobile**: Single column layout
- [ ] **Mobile**: Profile images are appropriately sized
- [ ] **Mobile**: Text is readable and properly spaced

### 6. Activities Section
- [ ] **Desktop**: Two-column grid with pill-shaped cards
- [ ] **Mobile**: Single column with rounded-3xl cards
- [ ] **Mobile**: Icons and text are properly sized
- [ ] **Mobile**: All content fits without horizontal scroll

### 7. Newsletter/CTA Section
- [ ] **Desktop**: Original layout with side-by-side input and button
- [ ] **Mobile**: Stacked layout with full-width elements
- [ ] **Mobile**: Input and button have proper tap targets
- [ ] **Mobile**: Purple wave decorations scale appropriately

### 8. General Mobile Checks
- [ ] **No horizontal scrolling** on any mobile viewport
- [ ] **All interactive elements** have minimum 44px tap targets
- [ ] **Text is readable** without zooming
- [ ] **Images scale** appropriately
- [ ] **Animations work** but may be simplified on mobile
- [ ] **Performance** is acceptable on mobile devices

## Browser Testing
Test on the following browsers:
- [ ] Chrome (mobile)
- [ ] Safari (iOS)
- [ ] Firefox (mobile)
- [ ] Edge (mobile)

## Performance Testing
- [ ] Page loads within 3 seconds on 3G connection
- [ ] No layout shift during loading
- [ ] Smooth scrolling on mobile
- [ ] Touch interactions are responsive

## Accessibility Testing
- [ ] All text meets WCAG contrast requirements
- [ ] Focus indicators are visible
- [ ] Screen reader compatibility
- [ ] Keyboard navigation works

## Issues to Report
If any issues are found, report them using the mobile issue reporting system:
1. Issues are automatically detected and reported
2. Manual reporting can be done via the webhook endpoint
3. Include viewport size, browser, and description of the issue

## Success Criteria
- ✅ Desktop layout remains unchanged at ≥1024px
- ✅ Mobile layouts are functional and readable at all test breakpoints
- ✅ No horizontal scrolling on mobile
- ✅ All interactive elements are accessible
- ✅ Performance is acceptable on mobile devices
