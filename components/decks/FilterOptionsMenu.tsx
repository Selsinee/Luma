import { DifficultyEnum, StatusEnum } from '@/api';
import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Types ---
type Difficulty = DifficultyEnum;
type Progress = 'all' | StatusEnum;
type SortBy = 'alphabetical' | 'difficulty' | 'recent';

export interface FilterState {
  difficulties: Set<Difficulty>;
  progress: Progress;
  sortBy: SortBy;
}

// --- Reusable Sub-Components ---
const CheckboxItem: React.FC<{
  label: string;
  count: number;
  color: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({ label, count, color, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.itemRow, isSelected && { backgroundColor: '#F0F0F7' }]}
    onPress={onPress}
  >
    <View style={styles.labelContainer}>
      <Feather
        name={isSelected ? 'check-square' : 'square'}
        size={20}
        color={isSelected ? Colors.primaryDark : '#8A8A8A'}
      />
      <View style={[styles.dot, { backgroundColor: color }]} />
      {/* ✨ MODIFIED: Apply selectedItemText style when selected for consistency */}
      <Text style={[styles.itemLabel, isSelected && styles.selectedItemText]}>
        {label} ({count})
      </Text>
    </View>
  </TouchableOpacity>
);

const RadioItem: React.FC<{
  label: string;
  count?: number;
  icon: keyof typeof Feather.glyphMap;
  isSelected: boolean;
  onPress: () => void;
}> = ({ label, count, icon, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.itemRow, isSelected && styles.selectedItem]}
    onPress={onPress}
  >
    <View style={styles.labelContainer}>
      <Feather
        name={icon}
        size={18}
        color={isSelected ? Colors.primaryDark : '#555'}
      />
      <Text style={[styles.itemLabel, isSelected && styles.selectedItemText]}>
        {label} {count !== undefined ? `(${count})` : ''}
      </Text>
    </View>
  </TouchableOpacity>
);

// --- Main Modal Menu Component ---
interface FilterOptionsMenuProps {
  isVisible: boolean;
  onClose: () => void;
  menuPosition: { top: number; right: number };
  onApplyFilters: (filters: FilterState) => void;
  initialFilters: FilterState;
}

const Separator = () => <View style={styles.separator} />;

export const FilterOptionsMenu: React.FC<FilterOptionsMenuProps> = ({
  isVisible,
  onClose,
  menuPosition,
  onApplyFilters,
  initialFilters,
}) => {
  const [difficulties, setDifficulties] = useState(initialFilters.difficulties);
  const [progress, setProgress] = useState(initialFilters.progress);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy);

  const handleDifficultyToggle = (difficulty: Difficulty) => {
    setDifficulties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(difficulty)) {
        newSet.delete(difficulty);
      } else {
        newSet.add(difficulty);
      }
      return newSet;
    });
  };

  const handleReset = () => {
    setDifficulties(new Set(Object.values(DifficultyEnum)));
    setProgress('all');
    setSortBy('alphabetical');
  };

  const handleCloseAndApply = () => {
    onApplyFilters({ difficulties, progress, sortBy });
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCloseAndApply}
    >
      <Pressable style={styles.backdrop} onPress={handleCloseAndApply}>
        <Pressable
          style={[styles.menuContainer, menuPosition]}
          onPress={e => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filter & Sort</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={handleReset}>
                <Text style={styles.resetButton}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Separator />

          <Text style={styles.sectionTitle}>Difficulty</Text>
          <CheckboxItem
            label="Easy"
            count={1}
            color="#2E7D32"
            isSelected={difficulties.has(DifficultyEnum.EASY)}
            onPress={() => handleDifficultyToggle(DifficultyEnum.EASY)}
          />
          <CheckboxItem
            label="Medium"
            count={3}
            color="#FFC107"
            isSelected={difficulties.has(DifficultyEnum.MEDIUM)}
            onPress={() => handleDifficultyToggle(DifficultyEnum.MEDIUM)}
          />
          <CheckboxItem
            label="Hard"
            count={2}
            color="#D32F2F"
            isSelected={difficulties.has(DifficultyEnum.HARD)}
            onPress={() => handleDifficultyToggle(DifficultyEnum.HARD)}
          />

          <Separator />

          <Text style={styles.sectionTitle}>Progress</Text>
          <RadioItem
            label="All Words"
            count={6}
            icon="circle"
            isSelected={progress === 'all'}
            onPress={() => setProgress('all')}
          />
          <RadioItem
            label="Mastered"
            count={3}
            icon="check-circle"
            isSelected={progress === StatusEnum.MASTERED}
            onPress={() => setProgress(StatusEnum.MASTERED)}
          />
          <RadioItem
            label="Learning"
            count={3}
            icon="clock"
            isSelected={progress === StatusEnum.LEARNING}
            onPress={() => setProgress(StatusEnum.LEARNING)}
          />

          <Separator />

          <Text style={styles.sectionTitle}>Sort by</Text>
          <RadioItem
            label="Alphabetical"
            icon="arrow-down"
            isSelected={sortBy === 'alphabetical'}
            onPress={() => setSortBy('alphabetical')}
          />
          <RadioItem
            label="Difficulty"
            icon="bar-chart-2"
            isSelected={sortBy === 'difficulty'}
            onPress={() => setSortBy('difficulty')}
          />
          <RadioItem
            label="Recently Reviewed"
            icon="clock"
            isSelected={sortBy === 'recent'}
            onPress={() => setSortBy('recent')}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1 },
  menuContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  resetButton: {
    fontSize: 14,
    color: Colors.primaryDark,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8A8A8A',
    textTransform: 'uppercase',
    marginVertical: 8,
    marginLeft: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
  },
  selectedItem: {
    backgroundColor: '#F0F0F7',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 12,
    marginRight: 8,
  },
  itemLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  selectedItemText: {
    color: Colors.primaryDark,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#E8E8F0',
    marginVertical: 8,
  },
});
