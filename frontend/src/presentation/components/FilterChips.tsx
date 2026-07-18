import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

type Chip = { label: string; value: string };

type Props = {
  chips: Chip[];
  selected: string;
  onSelect: (value: string) => void;
};

export function FilterChips({ chips, selected, onSelect }: Props): React.ReactElement {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.container}>
      {chips.map((chip) => {
        const active = chip.value === selected;
        return (
          <TouchableOpacity
            key={chip.value}
            style={[s.chip, active && s.chipActive]}
            onPress={() => onSelect(chip.value)}
          >
            <Text style={[s.chipText, active && s.chipTextActive]}>{chip.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { gap: 8, paddingVertical: 4 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.muted,
  },
  chipTextActive: {
    color: "#fff",
  },
});
