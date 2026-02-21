# Accord BioPharma Website Complete Test Plan

## Application Overview

Accord BioPharma is a specialty pharmaceutical company website with information about their biosimilar products, therapeutic areas, company culture, and contact/support services. The website includes a carousel showcasing company values, navigation menu with multiple sections, news updates, contact forms, and patient assistance information. Testing covers functional, non-functional, UI/UX, and content validation aspects across all key pages.

## Test Scenarios

### 1. Navigation and Menu Testing

**Seed:** `tests/seed.spec.ts`

#### 1.1. Homepage loads successfully with all header elements

**File:** `tests/navigation/homepage.spec.js`

**Steps:**
  1. Navigate to https://www.accordbiopharma.com/
    - expect: Page title should be 'Home - Accord BioPharma'
    - expect: Accord BioPharma logo should be visible in header
    - expect: Main navigation menu should be visible
    - expect: Navigation items should include: Our Culture, Biosimilars, Our Therapeutic Areas, HCP Resources, Our Newsroom, Contact Us
    - expect: Hero section with 'Beyond Biology' heading should be visible
    - expect: News carousel should display multiple news items

#### 1.2. Navigation menu items are clickable and functional

**File:** `tests/navigation/menu-navigation.spec.js`

**Steps:**
  1. From homepage, click on 'Our Culture' menu item
    - expect: Page should navigate to /our-culture/
    - expect: Page title should change to 'Our Culture - Accord BioPharma'
    - expect: Breadcrumb or current page indicator should show 'Our Culture'
  2. From any page, click on 'Our Therapeutic Areas' menu item
    - expect: Page should navigate to /our-therapeutic-areas/
    - expect: Content about therapeutic areas should display
    - expect: StoryMD partner content or links should be visible
  3. Click on 'Contact Us' menu item
    - expect: Page should navigate to /contact-us/
    - expect: Contact form should be displayed
    - expect: Corporate office address should be visible
    - expect: Contact phone number should be displayed
  4. Click on 'Our Newsroom' menu item
    - expect: Newsroom page should load with news listings
    - expect: Multiple news articles should be displayed

#### 1.3. Logo click returns to homepage

**File:** `tests/navigation/logo-navigation.spec.js`

**Steps:**
  1. Navigate to /our-culture/ and click on Accord BioPharma logo
    - expect: Should navigate back to homepage
    - expect: Page URL should be https://www.accordbiopharma.com/
    - expect: Homepage content should be displayed

#### 1.4. Breadcrumb navigation works correctly

**File:** `tests/navigation/breadcrumb.spec.js`

**Steps:**
  1. Navigate to inner pages like /our-culture/ and /contact-us/
    - expect: Breadcrumb navigation should be present if implemented
    - expect: Breadcrumb links should be clickable and functional
    - expect: Clicking breadcrumb home link should return to homepage

### 2. Homepage Carousel and Slider Testing

**Seed:** `tests/seed.spec.ts`

#### 2.1. News carousel displays all news items

**File:** `tests/carousel/news-carousel.spec.js`

**Steps:**
  1. Navigate to homepage and view the news carousel at top
    - expect: Carousel should display multiple news items
    - expect: Each news item should have title and link
    - expect: Superscript symbols (® ™) should render correctly
    - expect: Product names should be fully visible: IMULDOSA, HERCESSI, UDENYCA, CLOMID
  2. Click on a news item link in carousel
    - expect: External link should open to PRNewswire article
    - expect: Link should be valid and functional
    - expect: New tab/window should open or navigation should occur

#### 2.2. Outlook carousel navigates between slides

**File:** `tests/carousel/outlook-carousel.spec.js`

**Steps:**
  1. On homepage, view the 'OUR OUTLOOK' carousel section
    - expect: Carousel should display 6 slides
    - expect: First slide should show 'We think first about collaboration'
    - expect: All slides should be visible and properly formatted
    - expect: Slide navigation buttons should be present
  2. Click on slide navigation buttons 1-6
    - expect: Each button click should navigate to corresponding slide
    - expect: Slide content should change when button clicked
    - expect: Active button should be highlighted
    - expect: Text content should be visible and readable
  3. Test auto-rotation if implemented or manual navigation
    - expect: Slides should transition smoothly
    - expect: No content should be cut off during transition
    - expect: Navigation should remain responsive

### 3. Contact Form Testing

**Seed:** `tests/seed.spec.ts`

#### 3.1. Contact form displays all required fields

**File:** `tests/forms/contact-form-fields.spec.js`

**Steps:**
  1. Navigate to /contact-us/ page
    - expect: Contact form should be visible
    - expect: Form should have fields: First Name, Last Name, Professional Email, State, Inquiry Type, Question
    - expect: All required fields should be marked with asterisk (*)
    - expect: Submit button should be visible and enabled
    - expect: Form title should state 'Complete the form below to reach Accord BioPharma'
  2. Verify form structure and labels
    - expect: All field labels should be clear and properly associated with inputs
    - expect: State field should be a dropdown with all US states
    - expect: Inquiry About dropdown should include: Human Resources, Business Development, Public Relations, Patient Assistance, AccordConnects, Payer Coverage, Other
    - expect: Professional Email field should have placeholder 'e.g. username@domainname.com'
    - expect: Question textarea should be visible

#### 3.2. Contact form validation works correctly

**File:** `tests/forms/contact-form-validation.spec.js`

**Steps:**
  1. Leave all required fields empty and click Submit
    - expect: Form should not submit
    - expect: Validation error messages should appear for each required field
    - expect: Fields marked as required should show error indicators
  2. Enter invalid email in Professional Email field and attempt submit
    - expect: Email validation should reject invalid formats
    - expect: Error message should indicate invalid email format
    - expect: Form should not submit
  3. Select State as 'Please Select' and attempt submit
    - expect: State field should be required
    - expect: Error message should appear if not selected
    - expect: Form should not submit without valid state selection
  4. Select 'Please Select' for Inquiry Type and attempt submit
    - expect: Inquiry Type should be required
    - expect: Error message should appear if not selected

#### 3.3. Contact form submission with valid data

**File:** `tests/forms/contact-form-submission.spec.js`

**Steps:**
  1. Fill form with valid data: First Name='John', Last Name='Doe', Email='john@example.com', State='CA', Inquiry='Human Resources', Question='Test inquiry'
    - expect: All fields should accept input
    - expect: Characters should display correctly
    - expect: Form should be fillable without errors
  2. Check the required acknowledgement checkbox before submit
    - expect: Checkbox should be visible with text about agreeing to Terms of Use and Privacy Policy
    - expect: Checkbox should be toggleable
    - expect: Privacy Policy link should be present
  3. Click Submit button after filling form completely
    - expect: Form should submit successfully
    - expect: Success message should appear: 'Thank you for your submission' or similar
    - expect: Form should reset after submission
    - expect: User should remain on page or be redirected to success page

#### 3.4. Contact form special features and information

**File:** `tests/forms/contact-form-special.spec.js`

**Steps:**
  1. View contact form instructions
    - expect: Text should state 'any clinical inquiries should be made using the Medical Information Request page'
    - expect: Medical Information Request link should be clickable and functional
    - expect: Link should navigate to /request-medical-information page
  2. Look for product complaint information
    - expect: Notice should appear: 'Contact Us is not an appropriate platform to report an adverse event'
    - expect: Link to 'Adverse Events and Complaints' page should be provided
    - expect: Link should navigate to /report-adverse-events-and-complaints/ page
  3. View form footer information
    - expect: Required field indicator should be present: '*Indicates a Required Field'
    - expect: Promotional email consent text should be visible
    - expect: Links to Terms of Use and Privacy Policy should be present

### 4. Contact Information and Support Pages

**Seed:** `tests/seed.spec.ts`

#### 4.1. Corporate office information displays correctly

**File:** `tests/contact/office-info.spec.js`

**Steps:**
  1. Navigate to /contact-us/ and view corporate office section
    - expect: Office heading should read 'Corporate Office:'
    - expect: Company name 'Accord BioPharma' should be displayed
    - expect: Full address should be visible: '8041 Arco Corporate Drive, Suite 200, Raleigh, NC 27617 USA'
    - expect: Phone number should be displayed: '+1 919.941.7878'
    - expect: Phone number should be clickable as tel: link
  2. Click on phone number link
    - expect: Phone link should have href starting with 'tel:'
    - expect: Clicking should trigger phone call or copy phone number action

#### 4.2. Product Complaints and Adverse Events section is present

**File:** `tests/contact/adverse-events.spec.js`

**Steps:**
  1. View Product Complaints and Adverse Events section on contact page
    - expect: Section should have heading 'Product Complaints and Adverse Events'
    - expect: Icon/image should be present
    - expect: Link 'Click here' should be visible
    - expect: Text should state 'to learn how to submit a product complaint or report an adverse event.'
  2. Click 'Click here' link for adverse events
    - expect: Should navigate to /report-adverse-events-and-complaints/
    - expect: Adverse events reporting page should load

#### 4.3. HR Inquiries section is functional

**File:** `tests/contact/hr-inquiries.spec.js`

**Steps:**
  1. View HR Inquiries section
    - expect: Section heading should be 'HR Inquiries'
    - expect: Text should indicate form to fill out
    - expect: Commitment to diversity text should be displayed
    - expect: 'Learn More' link should be present
  2. Click 'Learn More' link in HR section
    - expect: Link should navigate to diversity/AAP document
    - expect: PDF should be accessible or new page should load

#### 4.4. Business Development section displays correctly

**File:** `tests/contact/bd-inquiries.spec.js`

**Steps:**
  1. View Business Development Inquiries section
    - expect: Section heading should be 'Business Development Inquiries'
    - expect: Icon should be displayed
    - expect: Text should state 'Fill out the form below to submit business development opportunities with the BioPharma team'
    - expect: Form submission should be possible

#### 4.5. Public Relations section is accessible

**File:** `tests/contact/public-relations.spec.js`

**Steps:**
  1. View Public Relations section
    - expect: Section heading should be 'Public Relations'
    - expect: Icon should be displayed
    - expect: Text should state 'Fill out the form below for public relations'
    - expect: Form area should be accessible

#### 4.6. Patient Assistance information is complete

**File:** `tests/contact/patient-assistance.spec.js`

**Steps:**
  1. View Patient Assistance section
    - expect: Section heading should be 'Patient Assistance'
    - expect: Phone number should display: '+1 (866) 258-7151'
    - expect: Business hours should be displayed: 'M-F 8:00 AM – 8:00 PM EST'
    - expect: Link to accordcaresportal.com should be present
    - expect: Phone number should be clickable
  2. Click patient assistance phone number
    - expect: tel: link should be triggered
    - expect: Correct phone number should be dialed
  3. Click accordcaresportal.com link
    - expect: Link should navigate to https://www.accordcaresportal.com/
    - expect: External site should load in new tab

#### 4.7. AccordConnects inventory system section

**File:** `tests/contact/accordconnects.spec.js`

**Steps:**
  1. View AccordConnects section
    - expect: Section heading should be 'AccordConnects'
    - expect: Icon should be displayed
    - expect: Text should indicate form for inventory management system questions
    - expect: Form area should be accessible

### 5. Content and Copy Testing

**Seed:** `tests/seed.spec.ts`

#### 5.1. Homepage content is accurate and complete

**File:** `tests/content/homepage-content.spec.js`

**Steps:**
  1. View homepage hero section
    - expect: Main heading should read 'Beyond Biology'
    - expect: Subheading should read 'At Accord BioPharma, we think beyond the expected.'
    - expect: Text should be prominently displayed
    - expect: All text should be spelled correctly
  2. View news carousel content
    - expect: All news items should display correctly
    - expect: Product names should be accurate
    - expect: Superscript symbols should render properly (® and ™)
    - expect: News headlines should be complete and readable
    - expect: All news links should be valid

#### 5.2. Our Culture page content is displayed correctly

**File:** `tests/content/culture-content.spec.js`

**Steps:**
  1. Navigate to /our-culture/ and view page content
    - expect: Page heading should be 'Our Culture'
    - expect: Page title should be 'Our Culture - Accord BioPharma'
    - expect: Description should include: 'Accord BioPharma is a boutique specialty products company'
    - expect: Text about team and patients should be visible
    - expect: Content about INTAS heritage should be present
    - expect: 'Discover our therapeutic areas' link should be visible

#### 5.3. Therapeutic Areas page content

**File:** `tests/content/therapeutic-content.spec.js`

**Steps:**
  1. Navigate to /our-therapeutic-areas/ and view content
    - expect: Content about specialty products should display
    - expect: Information about patient-focused approach should be visible
    - expect: References to therapeutic areas (oncology, immunology, critical care) should be present
    - expect: 'Beyond Biology' phrase should appear in content
    - expect: StoryMD partnership content should be visible
    - expect: 'Visit StoryMD' link should be present and functional

#### 5.4. Biosimilar products information

**File:** `tests/content/biosimilar-content.spec.js`

**Steps:**
  1. Navigate to Biosimilars section from menu
    - expect: Biosimilar product information should be displayed
    - expect: Product names should be accurate and properly formatted
    - expect: All registered trademarks should be properly marked
    - expect: Product descriptions should be clear

#### 5.5. Carousel 'Our Outlook' slide content accuracy

**File:** `tests/content/outlook-content.spec.js`

**Steps:**
  1. View all 6 slides in 'OUR OUTLOOK' carousel
    - expect: Slide 1: Should show 'We think first about collaboration and clever solutions, not products and workflows'
    - expect: Slide 2: Should show 'We think about our patients' lives and their perspectives, not just medicine and disease'
    - expect: Slide 3: Should show 'We think of doctors and clinicians as trusted partners, not as transactions'
    - expect: Slide 4: Should show 'We think we can deliver quality therapies that are both affordable and accessible'
    - expect: Slide 5: Should show 'We think about what comes before and after treatment, not just the drug'
    - expect: Slide 6: Should show 'We think Beyond Biology'
    - expect: All text should be properly formatted and readable

### 6. UI/UX and Visual Testing

**Seed:** `tests/seed.spec.ts`

#### 6.1. Responsive design - Desktop view

**File:** `tests/ui/responsive-desktop.spec.js`

**Steps:**
  1. Set viewport to desktop size (1280x1024) and navigate to homepage
    - expect: All elements should be visible without horizontal scrolling
    - expect: Navigation menu should display horizontally
    - expect: News carousel should display properly
    - expect: Outline carousel should display with all 6 slides
    - expect: Logo should be visible in header
    - expect: All text should be readable without zooming
  2. Navigate to /contact-us/ in desktop view
    - expect: Contact form should display in proper columns
    - expect: All form fields should be accessible
    - expect: Submit button should be clearly visible
    - expect: Contact information sections should display side-by-side

#### 6.2. Responsive design - Tablet view

**File:** `tests/ui/responsive-tablet.spec.js`

**Steps:**
  1. Set viewport to tablet size (768x1024) and navigate to homepage
    - expect: Navigation should adapt (possibly to hamburger menu)
    - expect: Content should reflow appropriately
    - expect: Carousel should display properly
    - expect: All text should remain readable
    - expect: No horizontal scrolling should be needed

#### 6.3. Responsive design - Mobile view

**File:** `tests/ui/responsive-mobile.spec.js`

**Steps:**
  1. Set viewport to mobile size (375x667) and navigate to homepage
    - expect: Navigation should collapse to mobile menu (hamburger)
    - expect: Content should be single column layout
    - expect: Carousel should be scrollable or properly resized
    - expect: Text should be readable without zooming
    - expect: All buttons should be touch-friendly
    - expect: No horizontal scrolling needed
  2. Navigate to /contact-us/ in mobile view
    - expect: Form should be single column
    - expect: All form fields should be full width
    - expect: Submit button should be easily clickable
    - expect: Contact information should be stacked vertically

#### 6.4. Button and link functionality

**File:** `tests/ui/buttons-links.spec.js`

**Steps:**
  1. Test all clickable elements: buttons, links, navigation items
    - expect: All buttons should have visible hover states
    - expect: All links should be underlined or styled distinctly
    - expect: Cursor should change to pointer on hover
    - expect: No dead links should exist
    - expect: All links should navigate to correct pages
  2. Test form buttons (Submit, etc.)
    - expect: Buttons should be enabled when form is valid
    - expect: Buttons should show loading state if applicable
    - expect: Button text should be clear and visible

#### 6.5. Image loading and display

**File:** `tests/ui/images.spec.js`

**Steps:**
  1. Navigate to various pages and verify all images
    - expect: All images should load successfully
    - expect: Images should display without distortion
    - expect: Alt text should be present on all images
    - expect: Hero images should be properly sized and cropped
    - expect: Carousel images should display correctly
  2. Test logo display on all pages
    - expect: Accord BioPharma logo should be consistent across pages
    - expect: Logo should be properly sized
    - expect: StoryMD logo should display on relevant pages

#### 6.6. Color contrast and accessibility

**File:** `tests/ui/accessibility.spec.js`

**Steps:**
  1. Verify text contrast ratios across the website
    - expect: Body text should have sufficient contrast (WCAG AA standard)
    - expect: Links should be distinguishable from body text
    - expect: Headings should be clearly visible
    - expect: Form labels should be readable
  2. Test keyboard navigation
    - expect: All interactive elements should be keyboard accessible
    - expect: Tab order should be logical
    - expect: Focus indicators should be visible
    - expect: Skip to content link should be present and functional

#### 6.7. Typography and text rendering

**File:** `tests/ui/typography.spec.js`

**Steps:**
  1. Check font families and sizes across website
    - expect: Fonts should be consistent across pages
    - expect: Headings should have larger font size than body text
    - expect: Superscript symbols should render correctly (®, ™)
    - expect: Special characters should display properly
    - expect: Text should not be cut off or overflow

### 7. Performance and Non-Functional Testing

**Seed:** `tests/seed.spec.ts`

#### 7.1. Page load time and performance

**File:** `tests/performance/load-time.spec.js`

**Steps:**
  1. Navigate to homepage and measure load time
    - expect: Page should load in under 3 seconds
    - expect: Visual content should be available within 2 seconds
    - expect: All critical content should be visible above the fold
  2. Navigate to other pages and measure load time
    - expect: /our-culture/ should load in under 3 seconds
    - expect: /our-therapeutic-areas/ should load in under 3 seconds
    - expect: /contact-us/ should load in under 3 seconds
    - expect: Form should be interactive immediately after page load

#### 7.2. Image optimization and loading

**File:** `tests/performance/image-optimization.spec.js`

**Steps:**
  1. Check image sizes and formats
    - expect: Images should be optimized for web
    - expect: Images should load progressively
    - expect: Carousel images should be appropriately sized
    - expect: No oversized images should exist

#### 7.3. Browser compatibility

**File:** `tests/compatibility/browser-compatibility.spec.js`

**Steps:**
  1. Test on Chrome/Chromium
    - expect: All functionality should work in Chrome
    - expect: Forms should be submittable
    - expect: Navigation should be functional
    - expect: Carousel should work smoothly
  2. Test on Firefox
    - expect: All functionality should work in Firefox
    - expect: Forms should be submittable
    - expect: Navigation should be functional
    - expect: Styles should apply correctly
  3. Test on Safari
    - expect: All functionality should work in Safari
    - expect: Forms should be submittable
    - expect: Navigation should be functional
  4. Test on Edge
    - expect: All functionality should work in Edge
    - expect: Forms should be submittable
    - expect: Navigation should be functional

#### 7.4. Cookie and consent management

**File:** `tests/compliance/cookie-consent.spec.js`

**Steps:**
  1. On first visit, verify cookie consent banner
    - expect: Cookie consent banner should appear at bottom
    - expect: Text should state: 'We use cookies on our website to give you the most relevant experience...'
    - expect: Two buttons should be present: 'Cookie Settings' and 'Accept'
    - expect: Banner should be dismissible
  2. Click 'Accept' button
    - expect: Banner should disappear
    - expect: Cookies should be set in browser
    - expect: Banner should not reappear on page reload (until cookie expires)
  3. Click 'Cookie Settings' button
    - expect: Cookie settings modal or page should open
    - expect: User should be able to customize cookie preferences

#### 7.5. External link handling

**File:** `tests/links/external-links.spec.js`

**Steps:**
  1. Test all external links (PRNewswire, StoryMD, etc.)
    - expect: All external links should be valid and accessible
    - expect: Links should open in new tab or new window
    - expect: Target attribute should be '_blank' for external links
    - expect: Links should not result in 404 errors

#### 7.6. Form submission security

**File:** `tests/security/form-security.spec.js`

**Steps:**
  1. Inspect contact form for security measures
    - expect: Form should use HTTPS
    - expect: CSRF protection should be in place
    - expect: Form should have security tokens/nonces
    - expect: Email field should be encrypted during transmission
  2. Test HTML input validation
    - expect: Special characters should be handled properly
    - expect: SQL injection attempts should be blocked
    - expect: Form should sanitize input on submission

### 8. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 8.1. 404 error page handling

**File:** `tests/error-handling/404-errors.spec.js`

**Steps:**
  1. Navigate to non-existent page like /invalid-page/
    - expect: 404 error page should display
    - expect: Error message should be clear
    - expect: Link to homepage should be provided
    - expect: Navigation menu should be available to return to valid pages

#### 8.2. Form submission error handling

**File:** `tests/error-handling/form-errors.spec.js`

**Steps:**
  1. Attempt form submission with network error simulated
    - expect: Error message should display to user
    - expect: User should be able to retry submission
    - expect: Form data should not be lost

#### 8.3. Missing images handling

**File:** `tests/error-handling/missing-assets.spec.js`

**Steps:**
  1. Verify page displays correctly even if some images fail to load
    - expect: Page should still be functional
    - expect: Layout should not break
    - expect: Alt text should be visible for missing images
    - expect: Other content should remain accessible

#### 8.4. Slow network handling

**File:** `tests/error-handling/slow-network.spec.js`

**Steps:**
  1. Simulate slow network connection (throttled)
    - expect: Page should remain functional
    - expect: Forms should be submittable
    - expect: Loading indicators should be visible
    - expect: Navigation should work even if slow

### 9. Data Validation and Business Logic

**Seed:** `tests/seed.spec.ts`

#### 9.1. Email validation in contact form

**File:** `tests/validation/email-validation.spec.js`

**Steps:**
  1. Test various email formats in Professional Email field
    - expect: Valid email (john@example.com) should be accepted
    - expect: Invalid formats should be rejected: 'john@', '@example.com', 'john.example.com'
    - expect: Email with spaces should be rejected
    - expect: Multiple @ symbols should be rejected
    - expect: Error message should guide user to correct format

#### 9.2. Required field validation

**File:** `tests/validation/required-fields.spec.js`

**Steps:**
  1. Test each required field individually
    - expect: First Name - should require at least 1 character
    - expect: Last Name - should require at least 1 character
    - expect: Email - should require valid email format
    - expect: State - should require selection (not default 'Please Select')
    - expect: Inquiry Type - should require selection (not default 'Please Select')
    - expect: All should show error if left blank on submit

#### 9.3. Text field input handling

**File:** `tests/validation/text-input.spec.js`

**Steps:**
  1. Test special characters in name fields
    - expect: Hyphens should be accepted (e.g., 'Mary-Jane')
    - expect: Apostrophes should be accepted (e.g., "O'Brien")
    - expect: Numbers should be accepted or rejected per requirements
    - expect: Excessive special characters should be handled gracefully
  2. Test character limits
    - expect: Fields should have reasonable character limits
    - expect: Long text should not break layout
    - expect: Textarea should handle multiple lines

#### 9.4. State dropdown validation

**File:** `tests/validation/state-dropdown.spec.js`

**Steps:**
  1. Test State dropdown functionality
    - expect: Dropdown should contain all 50 US states plus territories (PR, VI)
    - expect: States should be in alphabetical order
    - expect: Default option should be 'Please Select' (not pre-selected)
    - expect: Selection should be saved when form is submitted

#### 9.5. Inquiry Type dropdown validation

**File:** `tests/validation/inquiry-type.spec.js`

**Steps:**
  1. Test Inquiry Type dropdown
    - expect: Options should include: Human Resources, Business Development, Public Relations, Patient Assistance, AccordConnects, Payer Coverage, Other
    - expect: Default should be 'Please Select'
    - expect: Only one option should be selectable at a time
    - expect: Selected option should be visible after selection

### 10. Integration and Cross-page Testing

**Seed:** `tests/seed.spec.ts`

#### 10.1. Navigation flow between main pages

**File:** `tests/integration/navigation-flow.spec.js`

**Steps:**
  1. Start on homepage and navigate through all main pages
    - expect: Homepage → Our Culture (successful)
    - expect: Our Culture → Therapeutic Areas (successful)
    - expect: Therapeutic Areas → Contact Us (successful)
    - expect: Contact Us → Homepage (successful)
    - expect: All transitions should be smooth without errors

#### 10.2. Contact form integration with different inquiry types

**File:** `tests/integration/inquiry-routing.spec.js`

**Steps:**
  1. Select 'Human Resources' in Inquiry Type and submit
    - expect: Form should submit successfully
    - expect: Backend should route to HR inbox
    - expect: Confirmation should indicate HR inquiry type
  2. Select 'Business Development' and submit
    - expect: Form should submit successfully
    - expect: Should route to Business Development inbox
  3. Select 'Patient Assistance' and submit
    - expect: Form should submit successfully
    - expect: Should route to Patient Assistance team

#### 10.3. External link integration

**File:** `tests/integration/external-links.spec.js`

**Steps:**
  1. Click on PRNewswire links in news carousel
    - expect: All links should lead to valid PRNewswire articles
    - expect: Articles should be about Accord BioPharma products
    - expect: Page should open in new tab
  2. Click StoryMD link on therapeutic areas page
    - expect: Link should navigate to StoryMD site
    - expect: Should open in new tab
    - expect: Content should be related to advanced prostate cancer education
  3. Click patient assistance portal link
    - expect: Link should navigate to https://www.accordcaresportal.com/
    - expect: Portal should load successfully

### 11. SEO and Metadata Testing

**Seed:** `tests/seed.spec.ts`

#### 11.1. Page metadata and titles

**File:** `tests/seo/page-metadata.spec.js`

**Steps:**
  1. Check page titles on all main pages
    - expect: Homepage: 'Home - Accord BioPharma'
    - expect: Our Culture: 'Our Culture - Accord BioPharma'
    - expect: Therapeutic Areas: 'Our Therapeutic Areas - Accord BioPharma'
    - expect: Contact Us: 'Contact Us - Accord BioPharma'
    - expect: All titles should be descriptive and include brand name

#### 11.2. Meta descriptions

**File:** `tests/seo/meta-descriptions.spec.js`

**Steps:**
  1. Inspect meta description tags on all pages
    - expect: Each page should have a meta description tag
    - expect: Descriptions should be 150-160 characters
    - expect: Descriptions should be relevant to page content
    - expect: Descriptions should include keywords

#### 11.3. Heading hierarchy

**File:** `tests/seo/heading-hierarchy.spec.js`

**Steps:**
  1. Check heading structure on all pages
    - expect: Each page should have one H1 tag
    - expect: Headings should follow logical hierarchy (H1 > H2 > H3)
    - expect: No heading levels should be skipped
    - expect: Headings should match page structure

#### 11.4. Open Graph tags for social sharing

**File:** `tests/seo/social-sharing.spec.js`

**Steps:**
  1. Inspect Open Graph and Twitter meta tags
    - expect: og:title should be present
    - expect: og:description should be present
    - expect: og:image should be present and valid
    - expect: Twitter card tags should be present
    - expect: Links should be shareable on social media
