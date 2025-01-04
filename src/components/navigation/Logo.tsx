interface LogoProps {
  handleNavigation: (path: string) => void;
}

const Logo = ({ handleNavigation }: LogoProps) => {
  return (
    <div className="flex items-center">
      <a href="/" className="flex items-center space-x-2">
        <img 
          src="/lovable-uploads/2116ad73-ff5d-4c19-a805-159b9bde9446.png" 
          alt="Doc.MBA Logo" 
          className="h-12 w-auto"
        />
        <span className="text-2xl font-bold text-secondary hidden sm:inline">Doc.MBA</span>
      </a>
    </div>
  );
};

export default Logo;