import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "./App.css";

// ✅ Firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// ✅ Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCpCDBxAGCF_r0z4t3nQneBS3Bh_iUxFY",
    authDomain: "graduation-c5dd2.firebaseapp.com",
    projectId: "graduation-c5dd2",
    storageBucket: "graduation-c5dd2.firebasestorage.app",
    messagingSenderId: "1096267135377",
    appId: "1:1096267135377:web:1e495ebd0d9804b49b4230",
    measurementId: "G-P90YHF845B",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function GraduationLanding() {
    const containerRef = useRef(null);
    const dialogRef = useRef(null); // <-- added dialog ref
    const [isMobile, setIsMobile] = useState(false);
    const [fullName, setFullName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // 📱 Detect mobile
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
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

    // 🎞 Animation speed factor
    const speedFactor = isMobile ? 0.6 : 0.7;

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

    // Helper to show the empty-name dialog and lock background scroll
    const showEmptyNameDialog = () => {
        if (dialogRef.current && typeof dialogRef.current.showModal === "function") {
            try {
                dialogRef.current.showModal();
                // lock background scroll while dialog is open
                document.body.style.overflow = "hidden";
            } catch (err) {
                // Some browsers throw if dialog is already open; ignore
            }
        } else {
            alert("Vui lòng nhập họ và tên trước khi xác nhận!");
        }
    };

    // ✅ Handle attendance (accept/reject)
    const handleAttend = async (status) => {
        if (!fullName.trim()) {
            // Use dialog helper instead of direct alert or showModal
            showEmptyNameDialog();
            return;
        }

        try {
            setIsSubmitting(true);
            await addDoc(collection(db, "attendees"), {
                fullName,
                status, // 'accept' or 'reject'
                timestamp: serverTimestamp(),
            });

            if (status === "accept") {
                setSuccessMessage(`Cảm ơn bạn ${fullName} đã tham dự lễ tốt nghiệp cùng với Huy! 🎉`);
            } else if (status === "reject") {
                setSuccessMessage(`Rất tiếc về sự vắng mặt của bạn. Cảm ơn bạn ${fullName} đã thông báo cho Huy.`);
            } else {
                setSuccessMessage(`Cảm ơn ${fullName}!`);
            }

            setFullName("");
        } catch (error) {
            alert("Lỗi khi lưu thông tin: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page main-container" ref={containerRef}>

            {/* Dialog for empty name warning */}
            <dialog ref={dialogRef} className="rsvp-dialog" onClose={() => { document.body.style.overflow = ''; }}>
                <form method="dialog" className="dialog-form">
                    <p>Vui lòng nhập họ và tên trước khi xác nhận!</p>
                    <menu>
                        <button className="dialog-close" onClick={() => { if (dialogRef.current) { dialogRef.current.close(); document.body.style.overflow = ''; } }}>Đóng</button>
                    </menu>
                </form>
            </dialog>

            {/* === Hero Section === */}
            <motion.section className="hero-section no-3d-bg" style={{ y: yHero, opacity: opacityHero }}>
                <div className="hero-text">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="hero-badge"
                    >
                        <span className="emoji-badge">🎓</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
                        Lễ Tốt Nghiệp 2025
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}>
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
            <motion.section className="photo-section" style={{ opacity: opacityInvite, scale: scaleInvite, y: yInvite }}>
                <motion.div
                    className="photo-container"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="photo-frame">
                        {eventDetails.photoUrl ? (
                            <img src={eventDetails.photoUrl} alt="Graduate" className="graduate-photo" />
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

                    {/* ===== RSVP action moved here - centered under the name ===== */}
                    <motion.div className="action-section" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.6 }}>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Họ và Tên"
                            className="rsvp-input"
                        />

                        <div className="button-row">
                            <motion.button className="rsvp-button primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleAttend('accept')} disabled={isSubmitting}>
                                {isSubmitting ? 'Đang lưu...' : '✓ Xác nhận tham dự'}
                            </motion.button>

                            <motion.button className="rsvp-button secondary reject" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleAttend('reject')} disabled={isSubmitting}>
                                {isSubmitting ? 'Đang lưu...' : '✕ Không tham dự'}
                            </motion.button>
                        </div>

                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* === Event Details Section === */}
            <motion.section className="details-section" style={{ opacity: opacityDetails, x: xDetails }}>
                <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    Trân Trọng Kính Mời
                </motion.h2>

                <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
                    Hãy cùng tôi chào đón hành trình mới trong buổi lễ tốt nghiệp đầy ý nghĩa
                </motion.p>

                <div className="details-grid">
                    {[
                        { icon: "🕐", title: "Thời Gian", main: eventDetails.time, sub: eventDetails.date },
                        { icon: "📍", title: "Địa Điểm", main: eventDetails.location, sub: eventDetails.address },
                        { icon: "👔", title: "Dress Code", main: "Trang phục lịch sự", sub: "Semi-formal / Smart casual" },
                    ].map((item, i) => (
                        <motion.div key={i} className="detail-card" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * (i + 1), duration: 0.5 }} whileHover={{ y: -8, transition: { duration: 0.25 } }}>
                            <div className="card-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p className="detail-main">{item.main}</p>
                            <p className="detail-sub">{item.sub}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Note: RSVP moved to the photo section above */}

            </motion.section>

            {/* === Thank You Section === */}
            <motion.section className="thank-section" style={{ opacity: opacityThank, y: yThank }}>
                <motion.div className="thank-content" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    <div className="thank-decoration">✨</div>
                    <h3>Cảm Ơn Bạn!</h3>
                    <p>Sự hiện diện của bạn sẽ làm cho ngày này thêm ý nghĩa</p>
                    <div className="thank-decoration">💖</div>
                </motion.div>
            </motion.section>
        </div>
    );
}
