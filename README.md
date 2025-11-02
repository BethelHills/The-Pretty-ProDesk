# Helen B. Udeh - Virtual Assistant Portfolio Website

A modern, responsive professional portfolio website for a Virtual Assistant. Built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Beautiful gradient backgrounds, smooth animations, and professional styling
- **Smooth Scrolling**: Seamless navigation between sections
- **Interactive Elements**: 
  - Animated statistics counters
  - Progress bars for skills
  - Testimonial slider with auto-play
  - Mobile-friendly hamburger menu
- **Sections Included**:
  - Hero section with call-to-action buttons
  - About section with statistics
  - Services showcase (6 service cards)
  - Skills section with progress bars and tool icons
  - Portfolio/Projects section
  - Testimonials carousel
  - Contact form
  - Footer with social links

## Getting Started

1. Simply open `index.html` in your web browser
2. No build process or dependencies required - it's a pure HTML/CSS/JS website
3. All styles and scripts are linked directly in the HTML file

## Customization

### Update Contact Information
Edit the contact details in the Contact section of `index.html`:
- Email address
- Phone number
- Social media links

### Add Your Photo
Replace the placeholder icons with your actual photos:
- Hero section: Replace the `.image-placeholder` div with an `<img>` tag
- About section: Replace `.image-placeholder-large` with your photo
- Portfolio items: Add project images to `.image-placeholder-portfolio`

### Customize Colors
Edit the CSS variables in `styles.css` (root section):
```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --secondary-color: #8b5cf6;
    /* ... more variables */
}
```

### Update Content
- Edit text content directly in `index.html`
- Modify services, skills, and portfolio items
- Update testimonials with real client feedback

## File Structure

```
Helen-B-Udeh-Portfolio/
├── index.html      # Main HTML file
├── styles.css      # All CSS styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Poppins & Playfair Display)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contact Form

The contact form is currently set up with basic validation and displays an alert on submission. To make it functional, you'll need to:

1. Connect it to a backend service (e.g., Formspree, Netlify Forms, or your own server)
2. Update the form submission handler in `script.js`

## Future Enhancements

- Add actual project images
- Implement backend for contact form
- Add blog section
- Integrate analytics
- Add dark mode toggle
- Add more animations

## License

This project is open source and available for personal and commercial use.

