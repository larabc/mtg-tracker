
type HeaderProps = {
    title: string,
    description?: string
}

export default function Header(props: HeaderProps) {
    return (
        <>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </>
    )

}