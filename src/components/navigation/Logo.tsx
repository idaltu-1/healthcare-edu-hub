interface LogoProps {
  handleNavigation: (path: string) => void;
}

const Logo = ({ handleNavigation }: LogoProps) => {
  return (
    <button 
      onClick={() => handleNavigation("/")}
      className="flex items-center space-x-2"
    >
      <img 
        src="/lovable-uploads/9ae3a936-f8e2-41f3-9e5d-ca82b4c7b587.png" 
        alt="Doc.MBA Logo" 
        className="h-10 w-10"
      />
      <span className="text-xl font-bold text-primary">Doc.MBA</span>
    </button>
  );
};

export default Logo;