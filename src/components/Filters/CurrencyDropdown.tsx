import {useState} from 'react'
import { View, Text, Button, ScrollView } from 'react-native'

type props = {
    currency: string[],
    setCur: (cur: string | null) => void
}

export const CurrencyDropdown = ({currency, setCur}: props) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<string | null>(null)

    const selectHandler = (cur:string) => {
        setSelected(cur === selected ? null : cur)
        setCur(cur === selected ? null : cur)
        setOpen(false)
    }
    return (
        <View>
            <Button onPress={() => setOpen(!open)} title="Currencies ▼" />
            {selected && <Text style={{ paddingBottom: 4, fontSize: 16 }}>Selected Currency: {selected}</Text>}
            <ScrollView showsHorizontalScrollIndicator={false} style={{ marginBottom: 8, marginTop: 4 }}>
            {open && currency.map(cur => (
                <Text key={cur} onPress={() => selectHandler(cur)} style={{ fontWeight: selected === cur ? 'bold' : 'normal', padding: 4 }}>
                    {cur}
                </Text>
            ))}
            </ScrollView>
        </View>
    )
}
