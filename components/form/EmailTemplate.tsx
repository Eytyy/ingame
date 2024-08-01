import { Tailwind } from '@react-email/tailwind'

interface EmailTemplateProps {
  name: string
  email: string
  message: {
    value?: string
    label?: string
  }
  customFields: {
    [key: string]: {
      label: string
      value: string
    }
  }
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
  customFields,
}) => {
  const fields = Object.values(customFields)
  return (
    <Tailwind>
      <div className="font-sans space-y-1">
        <h1>
          {name}, {email}
        </h1>
        {message && (
          <div>
            <h2>{message.label}</h2>
            <p>{message.value}</p>
          </div>
        )}
        <div>
          {fields.map((field, index) => (
            <div key={`customField${index}`}>
              <h2 className="font-bold">{field.label}</h2>
              <p>{field.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Tailwind>
  )
}

export default EmailTemplate
