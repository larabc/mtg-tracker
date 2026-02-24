import { useState } from "react";
import { FORMATS } from "../utils/formats";
import { COLORS } from "../utils/colors";
import type { Archetype, Color, Format, NewDeck } from "../types";
import { ARCHETYPES } from "../utils/archetypes";


type DeckFormProps = {
    onSubmit: (data: NewDeck) => void
}


export default function DeckForm({ onSubmit }: DeckFormProps) {

    const [formData, setFormData] = useState<NewDeck>({
        name: '',
        format: '' as Format,
        colors: [] as Color[],
        archetype: '' as Archetype,
        comments: '',
        archived: false
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value as Color

        if (e.target.checked) {
            setFormData({ ...formData, colors: [...formData.colors, color] })
        } else {
            setFormData({ ...formData, colors: formData.colors.filter(existingColor => color !== existingColor) })
        }
    }


    return (
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit(formData);
        }}>
            <label htmlFor="deck-name">Deck Name</label>
            <input type="text" name="name" onChange={handleInputChange} />
            <select name="format" id="format-select" onChange={handleInputChange}>
                {FORMATS.map(format => (
                    <option key={format} value={format}>{format}</option>
                ))}
            </select>
            <fieldset>
                <legend>Color Identity</legend>
                {COLORS.map(color => (
                    <div key={color}>
                        <input type="checkbox" id={color} value={color} onChange={handleColorChange} />
                        <label htmlFor={color}>{color}</label>
                    </div>
                ))}
            </fieldset>
            <select name="archetype" id="archetype-select" onChange={handleInputChange}>
                {ARCHETYPES.map(archetype => (
                    <option key={archetype} value={archetype}>{archetype}</option>
                ))}
            </select>
            <textarea name="comments" id="comments" onChange={handleInputChange} />
            <button type="submit">Create Deck</button>
        </form>
    )
}