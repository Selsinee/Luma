import Colors from '@/constants/Colors';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { Feather } from '@expo/vector-icons';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Types and Data ---
const PRESET_GOALS = [
  {
    id: 'casual',
    icon: 'calendar' as const,
    title: 'Casual',
    subtitle: 'Perfect for busy schedules',
    value: 5,
  },
  {
    id: 'regular',
    icon: 'target' as const,
    title: 'Regular',
    subtitle: 'Steady progress every day',
    value: 10,
  },
  {
    id: 'ambitious',
    icon: 'trending-up' as const,
    title: 'Ambitious',
    subtitle: 'Fast-track your learning',
    value: 15,
  },
  {
    id: 'intensive',
    icon: 'zap' as const,
    title: 'Intensive',
    subtitle: 'Maximum learning speed',
    value: 20,
  },
];

// --- Reusable Preset Button Component ---
interface GoalPresetButtonProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  value: number;
  isSelected: boolean;
  onPress: () => void;
}

const GoalPresetButton: React.FC<GoalPresetButtonProps> = ({
  icon,
  title,
  subtitle,
  value,
  isSelected,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.presetButton, isSelected && styles.selectedPresetButton]}
    onPress={onPress}
  >
    <View style={styles.presetLeft}>
      <Feather
        name={icon}
        size={20}
        color={isSelected ? Colors.primaryDark : '#555'}
      />
      <View style={{ marginLeft: 12 }}>
        <Text
          style={[styles.presetTitle, isSelected && styles.selectedPresetText]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.presetSubtitle,
            isSelected && styles.selectedPresetText,
          ]}
        >
          {subtitle}
        </Text>
      </View>
    </View>
    <Text style={[styles.presetValue, isSelected && styles.selectedPresetText]}>
      {value}/day
    </Text>
  </TouchableOpacity>
);

// --- Self-Contained Bottom Sheet Component ---
export type ChangeGoalSheetHandle = {
  present: () => void;
  close: () => void;
};

interface ChangeGoalBottomSheetProps {
  initialGoal: number;
}

const ChangeGoalBottomSheet = forwardRef<
  ChangeGoalSheetHandle,
  ChangeGoalBottomSheetProps
>(({ initialGoal }, ref) => {
  const [goal, setGoal] = useState(initialGoal);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['90%'], []);
  const insets = useSafeAreaInsets();
  const { updateUserSettings } = useUpdateUser();

  const handleClose = () => bottomSheetModalRef.current?.close();
  const handleSave = () => {
    updateUserSettings({
      daily_goal: goal,
    });
    handleClose();
  };

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetModalRef.current?.present(),
    close: () => handleClose(),
  }));

  const { estimatedTime, weeklyWords, isCustomGoal } = useMemo(() => {
    const time = Math.round(goal * 2);
    const weekly = goal * 7;
    const custom = !PRESET_GOALS.some(p => p.value === goal);
    return { estimatedTime: time, weeklyWords: weekly, isCustomGoal: custom };
  }, [goal]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      handleIndicatorStyle={{ backgroundColor: '#E0E0E0' }}
      backgroundStyle={{ backgroundColor: '#F9F9FB' }}
    >
      <View
        style={[styles.sheetContentContainer, { paddingBottom: insets.bottom }]}
      >
        <View style={styles.header}>
          <Feather name="target" size={20} color="#A9B0D2" />
          <Text style={styles.headerTitle}>Change Daily Goal</Text>
        </View>

        <View style={styles.goalSummary}>
          <Text style={styles.goalValue}>{goal}</Text>
          <Text style={styles.goalSubtext}>
            words/day • ~{estimatedTime} min/day
          </Text>
        </View>

        <BottomSheetScrollView>
          <Text style={styles.sectionTitle}>Choose a Goal</Text>
          {PRESET_GOALS.map(preset => (
            <GoalPresetButton
              key={preset.id}
              {...preset}
              isSelected={goal === preset.value}
              onPress={() => setGoal(preset.value)}
            />
          ))}
          <View style={styles.customGoalHeader}>
            <Text style={styles.sectionTitle}>Custom Goal</Text>
            {isCustomGoal && (
              <View style={styles.selectedTag}>
                <Text style={styles.selectedTagText}>Selected</Text>
              </View>
            )}
          </View>
          <Text style={styles.sliderLabel}>Words per day</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={goal}
            onValueChange={setGoal}
            minimumTrackTintColor="#A9B0D2"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor={Colors.primaryDark}
          />
          <View style={styles.sliderMarkers}>
            <Text style={styles.markerText}>1</Text>
            <Text style={styles.markerText}>25</Text>
            <Text style={styles.markerText}>50</Text>
          </View>
          <View style={styles.weeklySummary}>
            <Text style={styles.weeklySummaryText}>
              Weekly: {weeklyWords} words
            </Text>
            <Text style={styles.weeklySummaryText}>
              Time: ~{estimatedTime} min/day
            </Text>
          </View>
          <View style={styles.tipsContainer}>
            <Feather name="info" size={16} color="#8A8A8A" />
            <Text style={styles.tipsText}>
              Tips: Start small, be consistent. You can always adjust later!
            </Text>
          </View>
        </BottomSheetScrollView>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleClose}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Feather name="target" size={16} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Save Goal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
});

ChangeGoalBottomSheet.displayName = 'ChangeGoalBottomSheet';

export default ChangeGoalBottomSheet;
const styles = StyleSheet.create({
  // Main Screen Styles
  screenContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  // Bottom Sheet Styles
  sheetContentContainer: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  goalSummary: { alignItems: 'center', marginBottom: 20 },
  goalValue: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  goalSubtext: { fontSize: 14, color: '#8A8A8A', marginTop: 4 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 12,
  },
  presetButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    padding: 16,
    marginBottom: 10,
  },
  selectedPresetButton: {
    borderColor: Colors.primaryDark,
    backgroundColor: '#F0F0F7',
  },
  presetLeft: { flexDirection: 'row', alignItems: 'center' },
  presetTitle: { fontSize: 16, fontWeight: '500', color: '#333' },
  presetSubtitle: { fontSize: 13, color: '#8A8A8A', marginTop: 2 },
  selectedPresetText: { color: Colors.primaryDark },
  presetValue: { fontSize: 14, fontWeight: '600', color: '#555' },
  customGoalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedTag: {
    backgroundColor: '#A9B0D2',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  selectedTagText: { fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' },
  sliderLabel: { fontSize: 14, color: '#666', marginTop: 8 },
  sliderMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: -10,
  },
  markerText: { fontSize: 12, color: '#B0B0B0' },
  weeklySummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  weeklySummaryText: { fontSize: 13, color: '#333' },
  tipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F7',
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  tipsText: { fontSize: 13, color: '#666', marginLeft: 8, flex: 1 },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: { color: '#333', fontWeight: '600', fontSize: 16 },
  saveButton: { backgroundColor: '#A9B0D2' },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 6,
  },
});
