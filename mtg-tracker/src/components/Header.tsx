
type HeaderProps = {
    title: string,
    description?: string
}

export default function Header(props: HeaderProps) {
    return (
        <div className="px-4 pt-6 pb-2">
            <h1 className="text-2xl font-bold">{props.title}</h1>
            <p>{props.description}</p>
        </div>
    )

}