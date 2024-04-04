import CardWrapper from './card-wrapper'
import FormError from './form-error'

export default function ErrorCard() {
  return (
    <CardWrapper headerLabel={'Oops! Something went wrong!'} backButtonLabel={'Back to login'} backButtonHref={'/auth/login'} showSocial={false}>
        <FormError />
    </CardWrapper>
  )
}
