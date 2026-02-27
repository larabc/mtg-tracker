
type HeaderProps = {
    title: string,
    description?: string
}

export default function Header(props: HeaderProps) {
    return (
        <div className="px-8 pt-8 pb-2">
            <h1 className="text-2xl font-bold">{props.title}</h1>
            <p>{props.description}</p>
        </div>
    )

}