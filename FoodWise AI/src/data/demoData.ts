import { MealRecord } from '../types';

/**
 * 60 Realistic Sample Records for FoodWise AI Demonstration
 * Clearly labeled: "Sample data created for educational prototype demonstration."
 */
const rawData: Array<Omit<MealRecord, 'wasted_servings' | 'waste_percentage'>> = [
  // Week 1
  { id: 'REC-001', date: '2026-08-01', day: 'Saturday', meal_type: 'Breakfast', expected_students: 310, prepared_servings: 320, consumed_servings: 305, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-002', date: '2026-08-01', day: 'Saturday', meal_type: 'Lunch', expected_students: 380, prepared_servings: 410, consumed_servings: 375, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-003', date: '2026-08-01', day: 'Saturday', meal_type: 'Dinner', expected_students: 340, prepared_servings: 350, consumed_servings: 335, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-004', date: '2026-08-02', day: 'Sunday', meal_type: 'Breakfast', expected_students: 260, prepared_servings: 280, consumed_servings: 250, holiday_event: 'Yes', event_type: 'Holiday' },
  { id: 'REC-005', date: '2026-08-02', day: 'Sunday', meal_type: 'Lunch', expected_students: 320, prepared_servings: 360, consumed_servings: 310, holiday_event: 'Yes', event_type: 'Holiday' },
  { id: 'REC-006', date: '2026-08-02', day: 'Sunday', meal_type: 'Dinner', expected_students: 300, prepared_servings: 320, consumed_servings: 295, holiday_event: 'Yes', event_type: 'Holiday' },

  // Week 2
  { id: 'REC-007', date: '2026-08-03', day: 'Monday', meal_type: 'Breakfast', expected_students: 420, prepared_servings: 435, consumed_servings: 418, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-008', date: '2026-08-03', day: 'Monday', meal_type: 'Lunch', expected_students: 480, prepared_servings: 510, consumed_servings: 472, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-009', date: '2026-08-03', day: 'Monday', meal_type: 'Dinner', expected_students: 440, prepared_servings: 450, consumed_servings: 432, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-010', date: '2026-08-04', day: 'Tuesday', meal_type: 'Breakfast', expected_students: 415, prepared_servings: 425, consumed_servings: 410, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-011', date: '2026-08-04', day: 'Tuesday', meal_type: 'Lunch', expected_students: 475, prepared_servings: 495, consumed_servings: 468, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-012', date: '2026-08-04', day: 'Tuesday', meal_type: 'Dinner', expected_students: 430, prepared_servings: 440, consumed_servings: 424, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-013', date: '2026-08-05', day: 'Wednesday', meal_type: 'Breakfast', expected_students: 410, prepared_servings: 420, consumed_servings: 405, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-014', date: '2026-08-05', day: 'Wednesday', meal_type: 'Lunch', expected_students: 490, prepared_servings: 530, consumed_servings: 481, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-015', date: '2026-08-05', day: 'Wednesday', meal_type: 'Dinner', expected_students: 445, prepared_servings: 460, consumed_servings: 438, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-016', date: '2026-08-06', day: 'Thursday', meal_type: 'Breakfast', expected_students: 405, prepared_servings: 415, consumed_servings: 400, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-017', date: '2026-08-06', day: 'Thursday', meal_type: 'Lunch', expected_students: 485, prepared_servings: 520, consumed_servings: 479, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-018', date: '2026-08-06', day: 'Thursday', meal_type: 'Dinner', expected_students: 435, prepared_servings: 450, consumed_servings: 428, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-019', date: '2026-08-07', day: 'Friday', meal_type: 'Breakfast', expected_students: 390, prepared_servings: 410, consumed_servings: 375, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-020', date: '2026-08-07', day: 'Friday', meal_type: 'Lunch', expected_students: 460, prepared_servings: 510, consumed_servings: 435, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-021', date: '2026-08-07', day: 'Friday', meal_type: 'Dinner', expected_students: 380, prepared_servings: 420, consumed_servings: 360, holiday_event: 'No', event_type: 'None' },

  // Week 3 - Midterm Exams Special Event
  { id: 'REC-022', date: '2026-08-10', day: 'Monday', meal_type: 'Breakfast', expected_students: 450, prepared_servings: 470, consumed_servings: 445, holiday_event: 'Yes', event_type: 'Examination' },
  { id: 'REC-023', date: '2026-08-10', day: 'Monday', meal_type: 'Lunch', expected_students: 520, prepared_servings: 550, consumed_servings: 512, holiday_event: 'Yes', event_type: 'Examination' },
  { id: 'REC-024', date: '2026-08-10', day: 'Monday', meal_type: 'Dinner', expected_students: 460, prepared_servings: 480, consumed_servings: 450, holiday_event: 'Yes', event_type: 'Examination' },
  { id: 'REC-025', date: '2026-08-11', day: 'Tuesday', meal_type: 'Breakfast', expected_students: 445, prepared_servings: 460, consumed_servings: 438, holiday_event: 'Yes', event_type: 'Examination' },
  { id: 'REC-026', date: '2026-08-11', day: 'Tuesday', meal_type: 'Lunch', expected_students: 515, prepared_servings: 540, consumed_servings: 505, holiday_event: 'Yes', event_type: 'Examination' },
  { id: 'REC-027', date: '2026-08-11', day: 'Tuesday', meal_type: 'Dinner', expected_students: 455, prepared_servings: 470, consumed_servings: 442, holiday_event: 'Yes', event_type: 'Examination' },
  { id: 'REC-028', date: '2026-08-12', day: 'Wednesday', meal_type: 'Breakfast', expected_students: 440, prepared_servings: 450, consumed_servings: 432, holiday_event: 'Yes', event_type: 'Examination' },
  { id: 'REC-029', date: '2026-08-12', day: 'Wednesday', meal_type: 'Lunch', expected_students: 510, prepared_servings: 535, consumed_servings: 498, holiday_event: 'Yes', event_type: 'Examination' },
  { id: 'REC-030', date: '2026-08-12', day: 'Wednesday', meal_type: 'Dinner', expected_students: 450, prepared_servings: 465, consumed_servings: 439, holiday_event: 'Yes', event_type: 'Examination' },

  // Week 4 - College Fest
  { id: 'REC-031', date: '2026-08-14', day: 'Friday', meal_type: 'Breakfast', expected_students: 380, prepared_servings: 420, consumed_servings: 360, holiday_event: 'Yes', event_type: 'College Event' },
  { id: 'REC-032', date: '2026-08-14', day: 'Friday', meal_type: 'Lunch', expected_students: 550, prepared_servings: 600, consumed_servings: 540, holiday_event: 'Yes', event_type: 'College Event' },
  { id: 'REC-033', date: '2026-08-14', day: 'Friday', meal_type: 'Dinner', expected_students: 520, prepared_servings: 580, consumed_servings: 510, holiday_event: 'Yes', event_type: 'College Event' },
  { id: 'REC-034', date: '2026-08-15', day: 'Saturday', meal_type: 'Breakfast', expected_students: 350, prepared_servings: 380, consumed_servings: 330, holiday_event: 'Yes', event_type: 'Festival' },
  { id: 'REC-035', date: '2026-08-15', day: 'Saturday', meal_type: 'Lunch', expected_students: 490, prepared_servings: 540, consumed_servings: 460, holiday_event: 'Yes', event_type: 'Festival' },
  { id: 'REC-036', date: '2026-08-15', day: 'Saturday', meal_type: 'Dinner', expected_students: 450, prepared_servings: 500, consumed_servings: 425, holiday_event: 'Yes', event_type: 'Festival' },

  // Week 5 - Normal Operating Days
  { id: 'REC-037', date: '2026-08-17', day: 'Monday', meal_type: 'Breakfast', expected_students: 425, prepared_servings: 435, consumed_servings: 420, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-038', date: '2026-08-17', day: 'Monday', meal_type: 'Lunch', expected_students: 485, prepared_servings: 515, consumed_servings: 476, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-039', date: '2026-08-17', day: 'Monday', meal_type: 'Dinner', expected_students: 440, prepared_servings: 450, consumed_servings: 431, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-040', date: '2026-08-18', day: 'Tuesday', meal_type: 'Breakfast', expected_students: 420, prepared_servings: 430, consumed_servings: 415, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-041', date: '2026-08-18', day: 'Tuesday', meal_type: 'Lunch', expected_students: 480, prepared_servings: 505, consumed_servings: 474, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-042', date: '2026-08-18', day: 'Tuesday', meal_type: 'Dinner', expected_students: 435, prepared_servings: 445, consumed_servings: 428, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-043', date: '2026-08-19', day: 'Wednesday', meal_type: 'Breakfast', expected_students: 415, prepared_servings: 425, consumed_servings: 410, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-044', date: '2026-08-19', day: 'Wednesday', meal_type: 'Lunch', expected_students: 490, prepared_servings: 525, consumed_servings: 482, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-045', date: '2026-08-19', day: 'Wednesday', meal_type: 'Dinner', expected_students: 440, prepared_servings: 455, consumed_servings: 432, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-046', date: '2026-08-20', day: 'Thursday', meal_type: 'Breakfast', expected_students: 410, prepared_servings: 420, consumed_servings: 405, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-047', date: '2026-08-20', day: 'Thursday', meal_type: 'Lunch', expected_students: 480, prepared_servings: 510, consumed_servings: 472, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-048', date: '2026-08-20', day: 'Thursday', meal_type: 'Dinner', expected_students: 430, prepared_servings: 440, consumed_servings: 422, holiday_event: 'No', event_type: 'None' },

  // Week 6 - End of Month
  { id: 'REC-049', date: '2026-08-21', day: 'Friday', meal_type: 'Breakfast', expected_students: 395, prepared_servings: 415, consumed_servings: 382, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-050', date: '2026-08-21', day: 'Friday', meal_type: 'Lunch', expected_students: 465, prepared_servings: 515, consumed_servings: 440, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-051', date: '2026-08-21', day: 'Friday', meal_type: 'Dinner', expected_students: 390, prepared_servings: 430, consumed_servings: 368, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-052', date: '2026-08-24', day: 'Monday', meal_type: 'Breakfast', expected_students: 430, prepared_servings: 440, consumed_servings: 425, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-053', date: '2026-08-24', day: 'Monday', meal_type: 'Lunch', expected_students: 495, prepared_servings: 520, consumed_servings: 488, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-054', date: '2026-08-24', day: 'Monday', meal_type: 'Dinner', expected_students: 445, prepared_servings: 455, consumed_servings: 436, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-055', date: '2026-08-25', day: 'Tuesday', meal_type: 'Breakfast', expected_students: 425, prepared_servings: 435, consumed_servings: 418, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-056', date: '2026-08-25', day: 'Tuesday', meal_type: 'Lunch', expected_students: 485, prepared_servings: 510, consumed_servings: 477, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-057', date: '2026-08-25', day: 'Tuesday', meal_type: 'Dinner', expected_students: 440, prepared_servings: 450, consumed_servings: 430, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-058', date: '2026-08-26', day: 'Wednesday', meal_type: 'Breakfast', expected_students: 420, prepared_servings: 430, consumed_servings: 412, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-059', date: '2026-08-26', day: 'Wednesday', meal_type: 'Lunch', expected_students: 490, prepared_servings: 520, consumed_servings: 481, holiday_event: 'No', event_type: 'None' },
  { id: 'REC-060', date: '2026-08-26', day: 'Wednesday', meal_type: 'Dinner', expected_students: 445, prepared_servings: 455, consumed_servings: 435, holiday_event: 'No', event_type: 'None' }
];

export const INITIAL_DEMO_DATASET: MealRecord[] = rawData.map(item => {
  const wasted = Math.max(0, item.prepared_servings - item.consumed_servings);
  const pct = item.prepared_servings > 0 ? (wasted / item.prepared_servings) * 100 : 0;
  return {
    ...item,
    wasted_servings: wasted,
    waste_percentage: Number(pct.toFixed(1))
  };
});
