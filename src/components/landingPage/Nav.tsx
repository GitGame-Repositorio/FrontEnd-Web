export const Nav = () => {
  const classLink = "text-xs h-20 relative content-center nav-link";
  return (
    <nav className="bg-primary-600 w-full h-20 content-center">
      <div className="container flex justify-between">
        <div className="text-white font-normal flex items-center">
          <h1 className="text-2xl mr-20">GIT GAME</h1>
          <div className="flex gap-6">
            <a href="#" className={classLink}>
              RECURSOS
            </a>
            <a href="#" className={classLink}>
              SOBRE
            </a>
            <a href="#" className={classLink}>
              JOGAR
            </a>
          </div>
        </div>
        <div className="content-center">
          <button className="btn bg-primary-50 text-primary-600">
            FAZER LOGIN
          </button>
        </div>
      </div>
    </nav>
  );
};
