# 🎓 Graduation Invitation - Customization Guide

## How to Customize Your Invitation

### 1. Update Your Personal Information

Open `src/GraduationInvite.jsx` and find the `eventDetails` state (around line 10):

```javascript
    const [eventDetails] = useState({
    name: "Đặng Quốc Huy",
    time: "6 giờ - 12 giờ",
    date: "Chủ Nhật, ngày 09/11/2025",
    location: "Trung tâm Hội nghị tỉnh",
    address: "01 Nguyễn Tất Thành, phường Quy Nhơn, tỉnh Gia Lai",
    photoUrl: "IMG_3159.jpg",
    facebookUrl: "https://facebook.com/dangquochuy",
});
```

### 2. Add Your Photo

#### Option A: Use a local image
1. Place your photo in the `public` folder (e.g., `public/my-photo.jpg`)
2. Update the `photoUrl` field:
   ```javascript
   photoUrl: "/my-photo.jpg"
   ```

#### Option B: Use an online image
1. Upload your photo to an image hosting service (e.g., imgur, cloudinary)
2. Update the `photoUrl` field with the full URL:
   ```javascript
   photoUrl: "https://example.com/your-photo.jpg"
   ```

### 3. Update Contact Information

Find the contact section in the same file (near the bottom) and update:

```javascript
<a href="tel:+84123456789" className="contact-link">
    📱 0768 464 821
</a>
<a href="mailto:graduate@example.com" className="contact-link">
    ✉️ qhuy14775@gmail.com
</a>
```

Replace with your actual phone number and email.

### 4. Customize Timeline

Update the timeline section (around line 260) with your event schedule:

```javascript
<h4>7:30 - 8:00</h4>
<p>Đón tiếp khách mời & Check-in</p>
```

### 5. Customize Colors (Advanced)

Open `src/App.css` to change the color scheme:

- Primary gold color: `#ffd700`
- Secondary pink color: `#ffb6ff`
- Dark background: `#0b0b10`

Search and replace these hex codes with your preferred colors.

## 🚀 Running the Project

```bash
npm start
```

The app will open at http://localhost:3000

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized build in the `build` folder that you can deploy to any web hosting service.

## 🎨 Features

✨ Beautiful 3D animated hero section
📸 Photo frame with decorative borders
📅 Event details cards with hover effects
⏰ Event timeline
💌 RSVP buttons
📱 Fully responsive design
🎭 Smooth scroll animations
✉️ Contact information section

## 💡 Tips

1. Use a high-quality square photo for best results (minimum 500x500px)
2. Keep your name concise for better mobile display
3. Test on mobile devices to ensure responsive design works well
4. Consider adding your school logo to the `public` folder

## 🌐 Deployment Options

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `build` folder
- **GitHub Pages**: Use `gh-pages` package for easy deployment
- **Firebase Hosting**: Simple and free hosting option

Enjoy your beautiful graduation invitation! 🎉

