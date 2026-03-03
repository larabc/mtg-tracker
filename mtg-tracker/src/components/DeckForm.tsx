import { useState } from "react";
import { FORMATS } from "../utils/formats";
import { COLORS } from "../utils/colors";
import type { Archetype, Color, Format, NewDeck } from "../types";
import { ARCHETYPES } from "../utils/archetypes";
import { COLOR_MAP } from "../utils/colorMap";
import wIcon from '../assets/w.svg'
import uIcon from '../assets/u.svg'
import bIcon from '../assets/b.svg'
import rIcon from '../assets/r.svg'
import gIcon from '../assets/g.svg'

const COLOR_ICONS: Record<string, string> = {
    W: wIcon,
    U: uIcon,
    B: bIcon,
    R: rIcon,
    G: gIcon,
}

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

    const handleOnSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 p-4">
            <label htmlFor="deck-name" className="text-zinc-400 text-sm">Deck Name</label>
            <input type="text" id="deck-name" name="name" onChange={handleInputChange} className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 outline-none border border-zinc-700" />
            <select name="format" value={formData.format} onChange={handleInputChange} className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 outline-none border border-zinc-700">
                <option value="">Select a format</option>
                {FORMATS.map(format => (
                    <option key={format} value={format}>{format}</option>
                ))}
            </select>
            <fieldset className="flex gap-3">
                <legend className="text-zinc-400 text-sm">Color Identity</legend>
                {COLORS.map(color => (
                    <div key={color} className="flex justify-center items-center">
                        <input
                            type="checkbox"
                            id={`color-${color.toLowerCase()}`}
                            value={color}
                            onChange={handleColorChange}
                            className="sr-only peer"
                        />
                        <label
                            htmlFor={`color-${color.toLowerCase()}`}
                            className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer peer-checked:ring-2 peer-checked:ring-amber-400 peer-checked:ring-offset-2 peer-checked:ring-offset-zinc-900 ${COLOR_MAP[color]}`}
                        >
                            <img src={COLOR_ICONS[color]} alt={color} className="w-6" />
                        </label>
                    </div>
                ))}
            </fieldset>
            <select name="archetype" value={formData.archetype} onChange={handleInputChange} className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 outline-none border border-zinc-700">
                <option value="">Select an archetype</option>
                {ARCHETYPES.map(archetype => (
                    <option key={archetype} value={archetype}>{archetype}</option>
                ))}
            </select>
            <textarea name="comments" id="comments" onChange={handleInputChange} className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 outline-none border border-zinc-700" />
            <button className="w-full py-3 rounded-xl bg-amber-400 text-zinc-950 font-bold text-base">Create Deck</button>
        </form>
    )
}