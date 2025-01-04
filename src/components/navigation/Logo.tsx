interface LogoProps {
  handleNavigation: (path: string) => void;
}

const Logo = ({ handleNavigation }: LogoProps) => {
  return (
    <button 
      onClick={() => handleNavigation("/")}
      className="flex items-center space-x-2"
    >
      <span className="text-xl font-bold text-primary-foreground">Doc.MBA</span>
    </button>
  );
};

export default Logo;