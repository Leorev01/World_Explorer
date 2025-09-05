import {useState} from 'react'
import { View, Text, Button, ScrollView } from 'react-native'

type props = {
    languages: string[],
    setLang: (lang: string | null) => void
}

export const LanguagesDropdown = ({languages, setLang}: props) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<string | null>(null)

    const selectHandler = (lang:string) => {
        setSelected(lang === selected ? null : lang)
        setLang(lang === selected ? null : lang)
        setOpen(false)
    }
    return (
        <View>
            <Button onPress={() => setOpen(!open)} title="Languages ▼" />
            {selected && <Text style={{ paddingBottom: 4, fontSize: 16 }}>Selected Language: {selected}</Text>}
            <ScrollView showsHorizontalScrollIndicator={false} style={{ marginBottom: 8, marginTop: 4 }}>
            {open && languages.map(lang => (
                <Text key={lang} onPress={() => selectHandler(lang)} style={{ fontWeight: selected === lang ? 'bold' : 'normal', padding: 4 }}>
                    {lang}
                </Text>
            ))}
            </ScrollView>
        </View>
    )
}
