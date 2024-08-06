import { Tailwind } from "@react-email/tailwind";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: {
    value?: string;
    label?: string;
  };
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => {
  return (
    <Tailwind>
      <div className="space-y-1 font-sans">
        <h1>
          {name}, {email}
        </h1>
        {message && (
          <div>
            <h2>{message.label}</h2>
            <p>{message.value}</p>
          </div>
        )}
      </div>
    </Tailwind>
  );
};

export default EmailTemplate;
