interface AlertProps {
  children: React.ReactNode;
  onClose: (event: MouseEvent) => void;
}
const Alert = ({ children, onClose }: AlertProps) => {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
        {children}
      </div>
    </div>
  );
};

export default Alert;
