type ProfileInfoProps = {
  name: string
  country?: string
  product?: string
  email?: string
  avatar?: string
}

const ProfileInfoView = ({ name, country, product, email, avatar }: ProfileInfoProps) => {
  return (
    <div>
      <h2>Информация о пользователе:</h2>
        <p><b>Имя:</b> {name}</p>
        <p><b>Страна:</b> {country || 'Не указана'}</p>
        <p><b>Тип аккаунта:</b> {product || 'Не указан'}</p>
        <p><b>Email:</b> {email || 'Не указан'}</p>
        {avatar && (
          <div>
            <b>Аватар:</b>
            <img src={avatar} alt="Аватар пользователя" style={{ width: 100, height: 100, borderRadius: '50%' }} />
          </div>
        )}
    </div>
  )
}

export default ProfileInfoView