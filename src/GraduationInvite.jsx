import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "./App.css";

export default function GraduationLanding() {
    const containerRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);

    // 🧠 Xác định thiết bị di động
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [eventDetails] = useState({
        name: "Đặng Quốc Huy",
        time: "6 giờ - 12 giờ",
        date: "Chủ Nhật, ngày 09/11/2025",
        location: "Trung tâm Hội nghị tỉnh",
        address: "01 Nguyễn Tất Thành, phường Quy Nhơn, tỉnh Gia Lai",
        photoUrl: "IMG_3159.jpg",
        facebookUrl: "https://facebook.com/dangquochuy",
    });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // 🎯 Điều chỉnh tốc độ animation theo loại thiết bị
    const speedFactor = isMobile ? 0.6 : 0.7; // càng nhỏ => cuộn càng nhanh

    // Scroll animations
    const yHero = useTransform(scrollYProgress, [0, 0.4 * speedFactor], ["0%", "-25%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.25 * speedFactor], [1, 0]);
    const opacityInvite = useTransform(scrollYProgress, [0.2 * speedFactor, 0.45 * speedFactor], [0, 1]);
    const scaleInvite = useTransform(scrollYProgress, [0.2 * speedFactor, 0.45 * speedFactor], [0.9, 1]);
    const yInvite = useTransform(scrollYProgress, [0.2 * speedFactor, 0.45 * speedFactor], ["25%", "0%"]);
    const opacityDetails = useTransform(scrollYProgress, [0.45 * speedFactor, 0.65 * speedFactor], [0, 1]);
    const xDetails = useTransform(scrollYProgress, [0.45 * speedFactor, 0.65 * speedFactor], ["-10%", "0%"]);
    const opacityThank = useTransform(scrollYProgress, [0.7 * speedFactor, 0.95 * speedFactor], [0, 1]);
    const yThank = useTransform(scrollYProgress, [0.7 * speedFactor, 0.95 * speedFactor], ["30%", "0%"]);

    return (
        <div className="page main-container" ref={containerRef}>
            {/* === Hero Section === */}
            <motion.section
                className="hero-section no-3d-bg"
                style={{ y: yHero, opacity: opacityHero }}
            >
                <div className="hero-text">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="hero-badge"
                    >
                        <span className="emoji-badge">🎓</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        Lễ Tốt Nghiệp 2025
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.9 }}
                    >
                        Một chương mới đang mở ra — Hãy cùng kỷ niệm khoảnh khắc đặc biệt này cùng Huy!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="scroll-indicator"
                    >
                        <span>Cuộn xuống để xem thêm</span>
                        <div className="scroll-arrow">↓</div>
                    </motion.div>
                </div>
            </motion.section>

            {/* === Photo Section === */}
            <motion.section
                className="photo-section"
                style={{ opacity: opacityInvite, scale: scaleInvite, y: yInvite }}
            >
                <motion.div
                    className="photo-container"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="photo-frame">
                        {eventDetails.photoUrl ? (
                            <img
                                src={eventDetails.photoUrl}
                                alt="Graduate"
                                className="graduate-photo"
                            />
                        ) : (
                            <div className="photo-placeholder">
                                <span className="photo-icon">🎓</span>
                                <p>Thêm ảnh của bạn tại đây</p>
                            </div>
                        )}
                    </div>

                    <motion.h2
                        className="graduate-name"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {eventDetails.name}
                    </motion.h2>

                    <motion.div
                        className="graduate-title"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="title-line"></div>
                        <span>Kỹ thuật phần mềm</span>
                        <div className="title-line"></div>
                    </motion.div>

                    <motion.blockquote
                        className="graduate-quote"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                    >
                        “Không có hành trình nào kết thúc — chỉ là chúng ta đang mở ra một chương mới.”
                    </motion.blockquote>

                    <motion.p
                        className="photo-caption"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        💡 Kỷ niệm 4 năm đại học – cảm ơn thầy cô và bạn bè đã cùng đồng hành!
                    </motion.p>

                    <motion.div
                        className="floating-icons"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <motion.span
                            className="float-icon"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            🎉
                        </motion.span>
                        <motion.span
                            className="float-icon"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ repeat: Infinity, duration: 2.4, delay: 0.5 }}
                        >
                            🎓
                        </motion.span>
                        <motion.span
                            className="float-icon"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 2.8, delay: 1 }}
                        >
                            🌟
                        </motion.span>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* === Event Details Section === */}
            <motion.section
                className="details-section"
                style={{ opacity: opacityDetails, x: xDetails }}
            >
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Trân Trọng Kính Mời
                </motion.h2>

                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                >
                    Hãy cùng tôi chào đón hành trình mới trong buổi lễ tốt nghiệp đầy ý nghĩa
                </motion.p>

                <div className="details-grid">
                    {[
                        { icon: "🕐", title: "Thời Gian", main: eventDetails.time, sub: eventDetails.date },
                        { icon: "📍", title: "Địa Điểm", main: eventDetails.location, sub: eventDetails.address },
                        { icon: "👔", title: "Dress Code", main: "Trang phục lịch sự", sub: "Semi-formal / Smart casual" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="detail-card"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * (i + 1), duration: 0.5 }}
                            whileHover={{ y: -8, transition: { duration: 0.25 } }}
                        >
                            <div className="card-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p className="detail-main">{item.main}</p>
                            <p className="detail-sub">{item.sub}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="action-section"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <motion.button
                        className="rsvp-button primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ✓ Xác nhận tham dự
                    </motion.button>

                    <motion.button
                        className="rsvp-button secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        📅 Thêm vào lịch
                    </motion.button>
                </motion.div>
            </motion.section>

            {/* === Thank You Section === */}
            <motion.section
                className="thank-section"
                style={{ opacity: opacityThank, y: yThank }}
            >
                <motion.div
                    className="thank-content"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="thank-decoration">✨</div>
                    <h3>Cảm Ơn Bạn!</h3>
                    <p>Sự hiện diện của bạn sẽ làm cho ngày này thêm ý nghĩa</p>
                    <div className="thank-decoration">💖</div>

                    <div className="contact-info">
                        <p>Mọi thắc mắc vui lòng liên hệ:</p>
                        <div className="links">
                            <a href="tel:+84123456789" className="contact-link">
                                📱 0768 464 821
                            </a>
                            <a href="mailto:graduate@example.com" className="contact-link">
                                ✉️ qhuy14775@gmail.com
                            </a>
                            <a
                                href={eventDetails.facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-link facebook-link"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22.676 0H1.326C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.326 24H12.82v-9.293H9.692v-3.62h3.128V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.765v2.314h3.588l-.467 3.62h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.676 0z" />
                                </svg>
                                Facebook
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.section>
        </div>
    );
}
