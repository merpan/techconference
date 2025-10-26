import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "./App.css"; // Tambahkan ini untuk styling

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validatePassword = (value) => {
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[!@#$%^&*]/.test(value);
    if (value.length < 8 || !hasNumber || !hasSymbol) {
      return "Password harus 8+ karakter, mengandung angka & simbol";
    }
    return true;
  };

  const onSubmit = (data) => {
    console.log("Data Registrasi:", data);
    setIsSubmitted(true);
    reset();
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => setIsSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <div className="container">
      <h2 className="title">Formulir Registrasi Tech Conference</h2>

      {isSubmitted && (
        <p className="success-msg">
          ✅ Registrasi Berhasil! Data Anda telah dikirim..
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="form-box">
        {/* Nama Lengkap */}
        <div className="form-group">
          <label>Nama Lengkap</label>
          <input
            {...register("fullName", { required: "Nama lengkap wajib diisi" })}
            placeholder="Masukkan nama lengkap"
          />
          {errors.fullName && (
            <span className="error">{errors.fullName.message}</span>
          )}
        </div>

        {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <input
            {...register("username", {
              required: "Username wajib diisi",
              minLength: { value: 6, message: "Minimal 6 karakter" },
              maxLength: { value: 20, message: "Maksimal 20 karakter" },
            })}
            placeholder="Masukkan username"
          />
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format email tidak valid",
              },
            })}
            placeholder="contoh@email.com"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password wajib diisi",
              validate: validatePassword,
            })}
            placeholder="Masukkan password"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        {/* Umur */}
        <div className="form-group">
          <label>Umur</label>
          <input
            type="number"
            {...register("age", {
              required: "Umur wajib diisi",
              min: { value: 18, message: "Minimal 18 tahun" },
              max: { value: 100, message: "Maksimal 100 tahun" },
            })}
            placeholder="Masukkan umur"
          />
          {errors.age && <span className="error">{errors.age.message}</span>}
        </div>

        {/* Tipe Tiket */}
        <div className="form-group">
          <label>Tipe Tiket</label>
          <select
            {...register("ticketType", { required: "Anda harus memilih tipe tiket" })}
          >
            <option value="">-- Pilih Tipe Tiket --</option>
            <option value="General Access">General Access</option>
            <option value="VIP">VIP</option>
            <option value="Student">Student</option>
          </select>
          {errors.ticketType && (
            <span className="error">{errors.ticketType.message}</span>
          )}
        </div>

        {/* Website */}
        <div className="form-group">
          <label>Situs Web Pribadi (Opsional)</label>
          <input
            type="url"
            {...register("websiteUrl", {
              pattern: {
                value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                message: "Format URL tidak valid",
              },
            })}
            placeholder="https://contohwebsite.com"
          />
          {errors.websiteUrl && (
            <span className="error">{errors.websiteUrl.message}</span>
          )}
        </div>

        {/* Checkbox */}
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              {...register("agreeToTerms", {
                required: "Anda harus menyetujui syarat dan ketentuan",
              })}
            />
            Saya setuju dengan syarat & ketentuan
          </label>
          {errors.agreeToTerms && (
            <span className="error">{errors.agreeToTerms.message}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Daftar Sekarang
        </button>
      </form>
    </div>
  );
}
