import { useNavigate } from 'react-router-dom'


type HeaderProps = {
    title: string,
    description?: string
    hasBackButton?: boolean
}

export default function Header({ title, description, hasBackButton = false }: HeaderProps) {

    const navigate = useNavigate()
    return (
        <div className="px-4 pt-8 pb-2">
            {hasBackButton && <button className='py-4' onClick={() => navigate(-1)}>Back</button>}
            <h1 className="text-2xl font-bold">{title}</h1>
            <p>{description}</p>
        </div>
    )

}