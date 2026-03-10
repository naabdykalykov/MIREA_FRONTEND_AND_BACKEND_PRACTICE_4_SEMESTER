import "./AuthPage.scss";

export default function LoginPage({ onSwitchPage }) {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <div className="auth-header__inner">
          <div className="auth-brand">TechStore</div>
          <div className="auth-header__right">Вход</div>
        </div>
      </header>
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <h1 className="auth-title">Вход в аккаунт</h1>
            <p className="auth-subtitle">
              Используйте e-mail и пароль, выданные вам в системе.
            </p>
            <form className="auth-form">
              <label className="auth-label">
                E-mail
                <input
                  className="auth-input"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                />
              </label>
              <label className="auth-label">
                Пароль
                <input
                  className="auth-input"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                />
              </label>
              <div className="auth-actions">
                <button type="button" className="auth-btn auth-btn--primary">
                  Войти
                </button>
                <div className="auth-alt">
                  Нет аккаунта?{" "}
                  <button
                    type="button"
                    className="auth-link"
                    onClick={onSwitchPage}
                  >
                    Зарегистрироваться
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className="auth-footer">
        <div className="auth-footer__inner">
          © {new Date().getFullYear()} TechStore · Учебный проект
        </div>
      </footer>
    </div>
  );
}
