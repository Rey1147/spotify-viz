import { Link } from 'react-router-dom'
import type { User } from "@/types"
import logo from '../../../public/image/logo.svg'
import styles from './index.module.scss'

type HeaderViewProps = {
  user: User,
  logout: () => void
}

// TODO: добавить дропдаун с информацией юзера и кнопкой выхода

const HeaderView = ({ user, logout}: HeaderViewProps) => {
  return (
    <header className={styles.header}>
      <Link to='/'>
        <img src={logo} className={styles.header__logo} alt="logo spotify dashboard" />
      </Link>
      <div className={styles.header__user}>
        <Link to='/profile'>
          <img src={user?.avatar} className={styles.header__user_avatar} alt="user avatar" />
        </Link>
        <button onClick={logout} className={styles.header__user_logout}> out </button>
      </div>
    </header>
  )
}

export default HeaderView