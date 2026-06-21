import type { WorkoutDay } from '../types'

export const workoutPlan: WorkoutDay[] = [
  {
    id: 'monday',
    label: 'Mon',
    title: 'Chest + Triceps',
    focus: 'Push strength, chest control, triceps volume',
    warmup: '5-7 minutes treadmill, bike, or elliptical. Then 1 very light warm-up set on the first chest press movement.',
    finisher: '8 minutes incline treadmill walk at a pace where breathing is elevated but controlled.',
    muscleNotes: [
      'Chest moves the arms forward and across the body.',
      'Front shoulders assist pressing, but they should not take over.',
      'Triceps extend the elbow and finish pressing movements.'
    ],
    exercises: [
      {
        id: 'monday-chest-press',
        title: 'Main Chest Press',
        muscleGroup: 'Chest',
        setCount: 3,
        repRange: '8-12',
        restSeconds: 90,
        options: [
          {
            kind: 'primary',
            name: 'Machine Chest Press',
            machineLooksLike: 'A seated chair with a tall back pad, two handles in front of your chest, and a pin-loaded weight stack on one side.',
            setup: [
              'Set the seat so the handles start around mid-chest.',
              'Keep your back against the pad and feet flat on the floor.',
              'Pull shoulder blades slightly back into the pad before pressing.'
            ],
            execution: [
              'Press the handles forward until arms are nearly straight.',
              'Lower until elbows move slightly behind your torso.',
              'Move with control instead of bouncing the handles.'
            ],
            formChecks: [
              'Shoulders should not shrug toward your ears.',
              'Wrists should stay stacked with forearms.',
              'Back should stay on the pad.'
            ],
            muscleTarget: 'Mid-chest with triceps assisting.'
          },
          {
            kind: 'backup',
            name: 'Smith Machine Flat Bench Press',
            machineLooksLike: 'A barbell locked into vertical rails inside a rack frame. The bar moves only up and down along the rails.',
            setup: [
              'Place a flat bench under the Smith bar.',
              'Line the bar over mid-chest when lying down.',
              'Grip slightly wider than shoulder width and unlock the bar before lowering.'
            ],
            execution: [
              'Lower the bar to mid-chest under control.',
              'Press upward without bouncing off the chest.',
              'Re-lock the bar only after the last rep is fully controlled.'
            ],
            formChecks: [
              'Elbows should angle about 45-70 degrees from your torso.',
              'Shoulder blades stay tucked on the bench.',
              'Do not over-arch to force extra weight.'
            ],
            muscleTarget: 'Chest pressing strength with a more fixed bar path.'
          },
          {
            kind: 'fallback',
            name: 'Incline Push-Up',
            machineLooksLike: 'A bodyweight press using a bench, Smith bar set high, or stable platform for your hands.',
            setup: [
              'Put hands slightly wider than shoulders on a stable surface.',
              'Walk feet back until body is straight from shoulders to ankles.',
              'Brace your abs before starting.'
            ],
            execution: [
              'Lower chest toward the surface.',
              'Press back up without letting hips sag.',
              'Move slowly enough to keep chest engaged.'
            ],
            formChecks: [
              'Body should move as one piece.',
              'Hands should not be too far forward.',
              'Stop when form starts to break.'
            ],
            muscleTarget: 'Chest and triceps with lower setup friction.'
          }
        ]
      },
      {
        id: 'monday-incline-press',
        title: 'Upper Chest Press',
        muscleGroup: 'Upper Chest',
        setCount: 3,
        repRange: '8-12',
        restSeconds: 90,
        options: [
          {
            kind: 'primary',
            name: 'Incline Chest Press Machine',
            machineLooksLike: 'A chest press machine with the back pad angled backward and handles that press upward and forward.',
            setup: [
              'Set seat so handles start around upper chest.',
              'Keep ribs down instead of arching hard.',
              'Place feet flat and brace before pressing.'
            ],
            execution: [
              'Press up and slightly forward.',
              'Lower until upper chest stretches lightly.',
              'Keep tension on the chest between reps.'
            ],
            formChecks: [
              'Do not let shoulders roll forward at the bottom.',
              'Do not press from the neck level.',
              'Keep wrists straight.'
            ],
            muscleTarget: 'Upper chest and front delts.'
          },
          {
            kind: 'backup',
            name: 'Incline Dumbbell Press',
            machineLooksLike: 'An adjustable bench tilted 30-45 degrees with a pair of dumbbells pressed from shoulder level.',
            setup: [
              'Set bench around 30 degrees if possible.',
              'Start dumbbells near the outside of upper chest.',
              'Keep shoulder blades pulled back on the bench.'
            ],
            execution: [
              'Press dumbbells up until they nearly meet over your chest.',
              'Lower slowly to a comfortable chest stretch.',
              'Keep elbows under wrists.'
            ],
            formChecks: [
              'Do not crash dumbbells together at the top.',
              'Do not let elbows drift behind shoulders aggressively.',
              'Use a weight you can stabilize.'
            ],
            muscleTarget: 'Upper chest with more stabilizer demand.'
          },
          {
            kind: 'fallback',
            name: 'Smith Machine Incline Press',
            machineLooksLike: 'Smith machine bar over an incline bench, moving on rails with fixed vertical travel.',
            setup: [
              'Place incline bench so bar tracks over upper chest.',
              'Grip just wider than shoulder width.',
              'Unrack carefully and keep feet planted.'
            ],
            execution: [
              'Lower toward upper chest.',
              'Press up smoothly.',
              'Re-lock the bar after the final controlled rep.'
            ],
            formChecks: [
              'Avoid pressing from throat height.',
              'Keep shoulders packed down.',
              'Do not use excessive arch.'
            ],
            muscleTarget: 'Upper chest using a guided bar path.'
          }
        ]
      },
      {
        id: 'monday-chest-fly',
        title: 'Chest Fly',
        muscleGroup: 'Chest Isolation',
        setCount: 3,
        repRange: '10-15',
        restSeconds: 60,
        options: [
          {
            kind: 'primary',
            name: 'Pec Deck Machine',
            machineLooksLike: 'A seated machine with a back pad and two moving arms or forearm pads that swing together in front of your chest.',
            setup: [
              'Set seat so handles or elbow pads are chest height.',
              'Start with arms open but not painfully stretched.',
              'Keep back against the pad.'
            ],
            execution: [
              'Bring arms together like hugging a barrel.',
              'Pause briefly when hands or pads meet.',
              'Return slowly without letting the stack slam.'
            ],
            formChecks: [
              'Elbows should keep a similar bend through the rep.',
              'Do not turn it into a press.',
              'Use a smooth arc.'
            ],
            muscleTarget: 'Pecs across the body, especially inner squeeze.'
          },
          {
            kind: 'backup',
            name: 'Cable Fly',
            machineLooksLike: 'A dual cable tower with adjustable pulleys, handles, and two weight stacks.',
            setup: [
              'Set both pulleys around chest height.',
              'Step forward into a staggered stance.',
              'Hold handles with a slight bend in your elbows.'
            ],
            execution: [
              'Sweep hands together in front of chest.',
              'Squeeze chest without shrugging shoulders.',
              'Let arms open slowly to the starting position.'
            ],
            formChecks: [
              'Torso should not swing forward and back.',
              'Elbows should not bend and straighten like a press.',
              'Stop before shoulder discomfort.'
            ],
            muscleTarget: 'Chest adduction with continuous cable tension.'
          },
          {
            kind: 'fallback',
            name: 'Light Dumbbell Fly',
            machineLooksLike: 'Flat or incline bench with two light dumbbells moved in a wide arc.',
            setup: [
              'Lie on a bench with very light dumbbells.',
              'Start above chest with palms facing each other.',
              'Keep a soft elbow bend.'
            ],
            execution: [
              'Open arms until chest stretches lightly.',
              'Bring dumbbells back together over chest.',
              'Move slowly and avoid deep range early on.'
            ],
            formChecks: [
              'Use light weight only.',
              'Do not drop elbows below shoulder comfort.',
              'Keep wrists neutral.'
            ],
            muscleTarget: 'Chest isolation when machines are not available.'
          }
        ]
      },
      {
        id: 'monday-pushdown',
        title: 'Triceps Pushdown',
        muscleGroup: 'Triceps',
        setCount: 3,
        repRange: '10-15',
        restSeconds: 60,
        options: [
          {
            kind: 'primary',
            name: 'Cable Rope Pushdown',
            machineLooksLike: 'A cable tower with the pulley set high and a rope attachment with rubber ends hanging from it.',
            setup: [
              'Stand close to the cable tower.',
              'Pin elbows close to your sides.',
              'Hold the rope ends with wrists neutral.'
            ],
            execution: [
              'Push rope down until elbows are straight.',
              'Separate rope ends slightly at the bottom.',
              'Let the rope return slowly to elbow bend.'
            ],
            formChecks: [
              'Upper arms should stay mostly still.',
              'Shoulders should not swing the rope down.',
              'Do not lean your body weight into each rep.'
            ],
            muscleTarget: 'Triceps elbow extension.'
          },
          {
            kind: 'backup',
            name: 'Straight Bar Cable Pushdown',
            machineLooksLike: 'Same high cable tower, but with a short straight or angled bar instead of a rope.',
            setup: [
              'Grip the bar overhand.',
              'Keep elbows near your ribs.',
              'Stand upright with a small forward lean.'
            ],
            execution: [
              'Press the bar down until arms are straight.',
              'Pause briefly at the bottom.',
              'Return until forearms are slightly above parallel.'
            ],
            formChecks: [
              'Do not let elbows flare backward.',
              'Keep wrists straight.',
              'Avoid shoulder movement.'
            ],
            muscleTarget: 'Triceps with a stable grip.'
          },
          {
            kind: 'fallback',
            name: 'Machine Dip',
            machineLooksLike: 'A seated machine with handles beside your torso that you press downward, often with a chest pad or belt.',
            setup: [
              'Set seat so handles are beside lower ribs.',
              'Keep torso upright or slightly forward.',
              'Start light to protect shoulders.'
            ],
            execution: [
              'Press handles down until arms are almost straight.',
              'Let elbows bend under control.',
              'Keep shoulders down.'
            ],
            formChecks: [
              'Shoulders should not roll forward painfully.',
              'Do not bounce at the bottom.',
              'Use shorter range if needed.'
            ],
            muscleTarget: 'Triceps with chest assistance.'
          }
        ]
      },
      {
        id: 'monday-overhead-extension',
        title: 'Overhead Triceps Extension',
        muscleGroup: 'Long-Head Triceps',
        setCount: 2,
        repRange: '10-15',
        restSeconds: 60,
        options: [
          {
            kind: 'primary',
            name: 'Cable Overhead Rope Extension',
            machineLooksLike: 'A cable tower with a rope attached around low or mid height while you face away from the machine.',
            setup: [
              'Face away from the cable with a staggered stance.',
              'Hold rope behind your head with elbows pointing forward.',
              'Step forward until the cable has tension.'
            ],
            execution: [
              'Extend arms overhead and forward.',
              'Pause when elbows straighten.',
              'Return rope behind head under control.'
            ],
            formChecks: [
              'Elbows should not flare wide.',
              'Lower back should not over-arch.',
              'Do not turn it into a chest press.'
            ],
            muscleTarget: 'Long head of the triceps for arm size.'
          },
          {
            kind: 'backup',
            name: 'Dumbbell Overhead Extension',
            machineLooksLike: 'One dumbbell held vertically with both hands behind or above your head while seated or standing.',
            setup: [
              'Hold the dumbbell by one end with both hands.',
              'Keep elbows close to your head.',
              'Brace ribs down.'
            ],
            execution: [
              'Lower dumbbell behind head.',
              'Extend arms upward.',
              'Move slowly through the stretch.'
            ],
            formChecks: [
              'Do not let elbows flare excessively.',
              'Do not force depth if shoulders complain.',
              'Keep head neutral.'
            ],
            muscleTarget: 'Triceps long head with simple equipment.'
          },
          {
            kind: 'fallback',
            name: 'Extra Rope Pushdown',
            machineLooksLike: 'Same high cable rope setup used for the pushdown.',
            setup: [
              'Use the same pushdown setup.',
              'Pick a slightly lighter weight than the first pushdown movement.',
              'Keep elbows pinned.'
            ],
            execution: [
              'Perform clean reps without shoulder swing.',
              'Aim for the top of the rep range.',
              'Stop before form breaks.'
            ],
            formChecks: [
              'No leaning or bouncing.',
              'Smooth return on every rep.',
              'Keep tension on triceps.'
            ],
            muscleTarget: 'Triceps volume when overhead position is not available or comfortable.'
          }
        ]
      }
    ]
  },
  {
    id: 'tuesday',
    label: 'Tue',
    title: 'Back + Biceps',
    focus: 'Pull strength, posture, lat width, arm flexion',
    warmup: '5-7 minutes rower, elliptical, or light pulldowns. Then 1 easy warm-up set of lat pulldown.',
    finisher: 'Farmer carries for 3 rounds of 30-45 seconds if space allows, otherwise 8 minutes bike or incline walk.',
    muscleNotes: [
      'Lats pull the upper arm down and help create back width.',
      'Mid-back pulls shoulder blades together for posture and rowing strength.',
      'Biceps bend the elbow and assist most pulling movements.'
    ],
    exercises: [
      {
        id: 'tuesday-lat-pulldown',
        title: 'Lat Pulldown',
        muscleGroup: 'Lats',
        setCount: 3,
        repRange: '8-12',
        restSeconds: 90,
        options: [
          {
            kind: 'primary',
            name: 'Lat Pulldown',
            machineLooksLike: 'A seated machine with a high cable, overhead bar, thigh pads, and a weight stack.',
            setup: [
              'Adjust thigh pad so your legs are held down.',
              'Grip bar slightly wider than shoulders or use neutral handles.',
              'Lean back slightly and set shoulders down.'
            ],
            execution: [
              'Pull elbows down toward your ribs.',
              'Bring bar to upper chest.',
              'Let bar rise slowly without losing shoulder control.'
            ],
            formChecks: [
              'Do not pull behind your neck.',
              'Do not yank with lower back.',
              'If biceps dominate, lower weight and think elbows down.'
            ],
            muscleTarget: 'Lats under the armpits and along the sides of the back.'
          },
          {
            kind: 'backup',
            name: 'Assisted Pull-Up Machine',
            machineLooksLike: 'A tall pull-up station with handles overhead and a knee pad or platform connected to a weight stack that assists you upward.',
            setup: [
              'Choose more assistance for easier reps.',
              'Place knees or feet on the platform depending on machine style.',
              'Start from a controlled hang with shoulders down.'
            ],
            execution: [
              'Pull chest toward handles.',
              'Lower slowly until arms are long again.',
              'Keep the torso controlled.'
            ],
            formChecks: [
              'Do not bounce off the platform.',
              'Do not crane neck over the bar.',
              'Use enough assistance to control reps.'
            ],
            muscleTarget: 'Lats and upper back using a bodyweight pattern.'
          },
          {
            kind: 'fallback',
            name: 'Straight-Arm Cable Pulldown',
            machineLooksLike: 'A cable tower with high pulley and straight bar or rope attachment used while standing.',
            setup: [
              'Set pulley high.',
              'Step back with arms nearly straight.',
              'Hinge forward slightly.'
            ],
            execution: [
              'Pull the handle down toward your thighs.',
              'Keep arms mostly straight.',
              'Return to shoulder height slowly.'
            ],
            formChecks: [
              'Do not bend elbows into a triceps pushdown.',
              'Keep ribs down.',
              'Feel the lats, not the neck.'
            ],
            muscleTarget: 'Lat isolation when pulldown stations are occupied.'
          }
        ]
      },
      {
        id: 'tuesday-cable-row',
        title: 'Seated Row',
        muscleGroup: 'Mid-Back',
        setCount: 3,
        repRange: '8-12',
        restSeconds: 90,
        options: [
          {
            kind: 'primary',
            name: 'Seated Cable Row',
            machineLooksLike: 'A low cable station with a small seat, foot plates, a cable handle, and a weight stack.',
            setup: [
              'Place feet on foot plates.',
              'Sit tall with arms extended.',
              'Let shoulders reach forward slightly without rounding hard.'
            ],
            execution: [
              'Pull handle toward lower ribs.',
              'Squeeze shoulder blades together.',
              'Return slowly until arms straighten.'
            ],
            formChecks: [
              'Torso should not rock aggressively.',
              'Do not shrug at the finish.',
              'Pull elbows back instead of curling the handle.'
            ],
            muscleTarget: 'Mid-back and lats with rowing mechanics.'
          },
          {
            kind: 'backup',
            name: 'Chest-Supported Row Machine',
            machineLooksLike: 'A seated row machine with a chest pad in front of you and handles you pull toward your body.',
            setup: [
              'Set seat so chest rests against the pad.',
              'Handles should start around mid-rib level.',
              'Keep feet planted.'
            ],
            execution: [
              'Pull elbows back and squeeze shoulder blades.',
              'Pause briefly at the back.',
              'Lower until arms are long.'
            ],
            formChecks: [
              'Chest should stay on the pad.',
              'Do not jerk the first few inches.',
              'Keep neck relaxed.'
            ],
            muscleTarget: 'Mid-back with less lower-back involvement.'
          },
          {
            kind: 'fallback',
            name: 'One-Arm Dumbbell Row',
            machineLooksLike: 'A dumbbell row using a bench for support and one dumbbell pulled beside the torso.',
            setup: [
              'Put one hand on a bench or stable surface.',
              'Hold dumbbell with the opposite hand.',
              'Keep back flat and hips square.'
            ],
            execution: [
              'Pull elbow toward hip.',
              'Pause briefly near ribs.',
              'Lower until shoulder reaches down under control.'
            ],
            formChecks: [
              'Do not twist the torso to cheat.',
              'Do not shrug into the neck.',
              'Keep the pull close to the body.'
            ],
            muscleTarget: 'One-side lat and mid-back work.'
          }
        ]
      },
      {
        id: 'tuesday-supported-row',
        title: 'Supported Row',
        muscleGroup: 'Mid-Back',
        setCount: 3,
        repRange: '8-12',
        restSeconds: 90,
        options: [
          {
            kind: 'primary',
            name: 'Chest-Supported Row Machine',
            machineLooksLike: 'A row station with a chest pad and independent or connected handles in front of you.',
            setup: [
              'Set seat so chest pad supports your sternum.',
              'Reach handles without rounding aggressively.',
              'Keep feet stable.'
            ],
            execution: [
              'Pull handles back toward ribs.',
              'Drive elbows behind you.',
              'Lower slowly and keep chest against pad.'
            ],
            formChecks: [
              'Do not peel chest off the pad.',
              'Do not curl with biceps first.',
              'Keep shoulders away from ears.'
            ],
            muscleTarget: 'Mid-back thickness and shoulder blade control.'
          },
          {
            kind: 'backup',
            name: 'Seated Cable Row Different Grip',
            machineLooksLike: 'The same low cable row station, using a different handle such as wide, neutral, or close grip.',
            setup: [
              'Attach a handle different from your first row if possible.',
              'Sit tall with controlled reach.',
              'Brace before pulling.'
            ],
            execution: [
              'Pull to ribs or upper abdomen depending on grip.',
              'Pause and squeeze.',
              'Return under control.'
            ],
            formChecks: [
              'Avoid rocking.',
              'Keep wrists neutral.',
              'Maintain the same torso angle.'
            ],
            muscleTarget: 'Additional rowing volume with a slight angle change.'
          },
          {
            kind: 'fallback',
            name: 'Dumbbell Row',
            machineLooksLike: 'Single dumbbell and bench-supported row setup.',
            setup: [
              'Use a bench or rack support.',
              'Brace with one hand.',
              'Keep the working arm long at the bottom.'
            ],
            execution: [
              'Row dumbbell to hip.',
              'Lower slowly.',
              'Switch sides after all reps.'
            ],
            formChecks: [
              'Do not rotate open every rep.',
              'Do not yank from the floor.',
              'Match reps on both sides.'
            ],
            muscleTarget: 'Back volume with minimal machine dependency.'
          }
        ]
      },
      {
        id: 'tuesday-straight-arm-pulldown',
        title: 'Lat Isolation',
        muscleGroup: 'Lats',
        setCount: 2,
        repRange: '12-15',
        restSeconds: 60,
        options: [
          {
            kind: 'primary',
            name: 'Straight-Arm Cable Pulldown',
            machineLooksLike: 'High cable pulley with straight bar or rope, performed standing while facing the tower.',
            setup: [
              'Set the pulley high.',
              'Stand back far enough for cable tension.',
              'Keep arms nearly straight and shoulders down.'
            ],
            execution: [
              'Pull bar from shoulder height down to thighs.',
              'Squeeze lats at bottom.',
              'Return slowly without letting shoulders shrug.'
            ],
            formChecks: [
              'Elbows stay mostly fixed.',
              'Ribs stay down.',
              'Do not turn it into a pushdown.'
            ],
            muscleTarget: 'Lat isolation and mind-muscle connection.'
          },
          {
            kind: 'backup',
            name: 'Rope Pullover',
            machineLooksLike: 'High cable rope attachment pulled in an arcing path toward your hips.',
            setup: [
              'Set high pulley with rope.',
              'Step back and hinge forward slightly.',
              'Grip rope ends with arms long.'
            ],
            execution: [
              'Pull rope toward hips.',
              'Spread rope slightly at bottom.',
              'Control the return.'
            ],
            formChecks: [
              'Do not curl the rope.',
              'Keep neck relaxed.',
              'Use lighter weight than pulldown.'
            ],
            muscleTarget: 'Lats with a slightly freer path than a bar.'
          },
          {
            kind: 'fallback',
            name: 'Extra Lat Pulldown Set',
            machineLooksLike: 'Same seated high cable pulldown station used earlier.',
            setup: [
              'Use a lighter weight than your working sets.',
              'Choose a controlled grip.',
              'Set shoulders down before pulling.'
            ],
            execution: [
              'Pull to upper chest.',
              'Pause briefly.',
              'Return slowly.'
            ],
            formChecks: [
              'Do not chase heavy weight here.',
              'Keep elbows driving down.',
              'No behind-neck reps.'
            ],
            muscleTarget: 'Extra lat practice.'
          }
        ]
      },
      {
        id: 'tuesday-db-curl',
        title: 'Dumbbell Curl',
        muscleGroup: 'Biceps',
        setCount: 3,
        repRange: '8-12',
        restSeconds: 60,
        options: [
          {
            kind: 'primary',
            name: 'Standing Dumbbell Curl',
            machineLooksLike: 'Two dumbbells from the rack curled while standing tall.',
            setup: [
              'Stand tall with dumbbells at sides.',
              'Keep elbows close to your ribs.',
              'Start palms forward or slightly angled.'
            ],
            execution: [
              'Curl dumbbells up without swinging.',
              'Squeeze biceps near the top.',
              'Lower fully under control.'
            ],
            formChecks: [
              'Hips should not throw the weight upward.',
              'Elbows should not drift far forward.',
              'Wrists should not collapse backward.'
            ],
            muscleTarget: 'Biceps with simple loading.'
          },
          {
            kind: 'backup',
            name: 'Seated Dumbbell Curl',
            machineLooksLike: 'A seated version using dumbbells while sitting on a flat or upright bench.',
            setup: [
              'Sit tall with dumbbells at sides.',
              'Let arms hang straight.',
              'Keep shoulders back.'
            ],
            execution: [
              'Curl without using body swing.',
              'Lower until elbows straighten.',
              'Alternate or curl both at once.'
            ],
            formChecks: [
              'Do not lean back to finish reps.',
              'Keep elbows close.',
              'Use full range.'
            ],
            muscleTarget: 'Biceps with less cheating.'
          },
          {
            kind: 'fallback',
            name: 'Cable Curl',
            machineLooksLike: 'Low cable pulley with a short bar, rope, or handles curled upward from the tower.',
            setup: [
              'Set pulley low.',
              'Stand facing cable with elbows near sides.',
              'Start with cable under tension.'
            ],
            execution: [
              'Curl handle upward.',
              'Pause at peak contraction.',
              'Lower slowly without stack slam.'
            ],
            formChecks: [
              'Do not let shoulders roll forward.',
              'Keep upper arms still.',
              'Avoid leaning backward.'
            ],
            muscleTarget: 'Biceps with steady cable tension.'
          }
        ]
      },
      {
        id: 'tuesday-cable-curl',
        title: 'Second Curl Pattern',
        muscleGroup: 'Biceps',
        setCount: 2,
        repRange: '10-15',
        restSeconds: 60,
        options: [
          {
            kind: 'primary',
            name: 'Cable Curl',
            machineLooksLike: 'Low cable station with a handle or bar attachment connected to a weight stack.',
            setup: [
              'Use a straight bar, EZ bar, rope, or single handles.',
              'Stand upright with elbows close.',
              'Keep cable taut before the first rep.'
            ],
            execution: [
              'Curl smoothly to chest height.',
              'Squeeze without lifting elbows high.',
              'Lower for 2 seconds.'
            ],
            formChecks: [
              'No hip swing.',
              'No shoulder shrug.',
              'Do not let the stack slam.'
            ],
            muscleTarget: 'Biceps volume with consistent resistance.'
          },
          {
            kind: 'backup',
            name: 'Preacher Curl Machine',
            machineLooksLike: 'A seated curl machine with an angled arm pad and handles in front of it.',
            setup: [
              'Set seat so upper arms rest fully on pad.',
              'Grip handles with wrists straight.',
              'Start with elbows almost straight.'
            ],
            execution: [
              'Curl handles upward.',
              'Pause briefly.',
              'Lower until arms are long but not hyperextended.'
            ],
            formChecks: [
              'Keep upper arms on the pad.',
              'Do not lift your chest off the bench.',
              'Use controlled range at the bottom.'
            ],
            muscleTarget: 'Biceps isolation with less body swing.'
          },
          {
            kind: 'fallback',
            name: 'Hammer Curl',
            machineLooksLike: 'Two dumbbells curled with palms facing each other like holding hammers.',
            setup: [
              'Stand tall with dumbbells at sides.',
              'Palms face inward.',
              'Elbows stay close.'
            ],
            execution: [
              'Curl dumbbells while keeping palms inward.',
              'Lower fully.',
              'Alternate arms if needed.'
            ],
            formChecks: [
              'No swinging.',
              'Keep shoulders down.',
              'Use the same range on both arms.'
            ],
            muscleTarget: 'Biceps plus brachialis and forearm thickness.'
          }
        ]
      }
    ]
  },
  {
    id: 'wednesday',
    label: 'Wed',
    title: 'Legs',
    focus: 'Quads, hamstrings, glutes, calves, basic bracing',
    warmup: '5-7 minutes bike or treadmill. Then 1-2 light ramp-up sets on leg press before work sets.',
    finisher: 'Three plank rounds of 30-60 seconds, then 5 minutes easy walk.',
    muscleNotes: [
      'Quads straighten the knee and carry squats and leg press.',
      'Hamstrings bend the knee and help hinge from the hips.',
      'Glutes extend the hips and stabilize the pelvis.',
      'Calves drive ankle extension and need full range.'
    ],
    exercises: [
      {
        id: 'wednesday-leg-press',
        title: 'Lower Body Compound',
        muscleGroup: 'Quads + Glutes',
        setCount: 4,
        repRange: '8-12',
        restSeconds: 120,
        options: [
          {
            kind: 'primary',
            name: 'Leg Press',
            machineLooksLike: 'A large angled machine with a seat, back pad, and big foot platform you push away from your body.',
            setup: [
              'Sit with back flat against the pad.',
              'Place feet shoulder-width on the platform.',
              'Set feet high enough that knees track comfortably over toes.'
            ],
            execution: [
              'Lower until knees are near 90 degrees or comfortable depth.',
              'Push through mid-foot and heel.',
              'Stop just short of hard knee lockout.'
            ],
            formChecks: [
              'Knees track the same direction as toes.',
              'Lower back should not curl off the pad.',
              'Do not slam the sled at the top or bottom.'
            ],
            muscleTarget: 'Quads and glutes with stable machine support.'
          },
          {
            kind: 'backup',
            name: 'Smith Machine Squat',
            machineLooksLike: 'A barbell fixed to vertical rails, used like a guided squat rack.',
            setup: [
              'Place bar across upper back, not neck.',
              'Set feet slightly forward of the bar path.',
              'Unlock bar and brace before descending.'
            ],
            execution: [
              'Squat down until comfortable depth.',
              'Drive through feet to stand.',
              'Keep torso controlled against the fixed path.'
            ],
            formChecks: [
              'Do not let knees collapse inward.',
              'Keep heels down.',
              'Avoid going so deep that pelvis tucks hard.'
            ],
            muscleTarget: 'Quads and glutes with guided bar balance.'
          },
          {
            kind: 'fallback',
            name: 'Goblet Squat',
            machineLooksLike: 'One dumbbell held vertically against your chest while squatting.',
            setup: [
              'Hold dumbbell close to chest.',
              'Set feet shoulder-width with toes slightly out.',
              'Brace abs before lowering.'
            ],
            execution: [
              'Sit between your hips.',
              'Stand up tall through mid-foot.',
              'Keep chest lifted.'
            ],
            formChecks: [
              'Do not let knees cave inward.',
              'Do not round your lower back.',
              'Keep dumbbell close.'
            ],
            muscleTarget: 'Quads, glutes, and squat pattern practice.'
          }
        ]
      },
      {
        id: 'wednesday-rdl',
        title: 'Hip Hinge',
        muscleGroup: 'Hamstrings + Glutes',
        setCount: 3,
        repRange: '8-12',
        restSeconds: 90,
        options: [
          {
            kind: 'primary',
            name: 'Dumbbell Romanian Deadlift',
            machineLooksLike: 'Two dumbbells held in front of the thighs while hinging the hips backward.',
            setup: [
              'Stand with feet hip-width.',
              'Hold dumbbells in front of thighs.',
              'Keep knees soft and chest tall.'
            ],
            execution: [
              'Push hips back while dumbbells slide down legs.',
              'Stop around mid-shin or when hamstrings stretch.',
              'Stand by driving hips forward.'
            ],
            formChecks: [
              'Back stays flat.',
              'Knees bend only slightly.',
              'Do not squat the weight down.'
            ],
            muscleTarget: 'Hamstrings and glutes through hip hinge.'
          },
          {
            kind: 'backup',
            name: 'Smith Machine Romanian Deadlift',
            machineLooksLike: 'Smith machine bar lowered along the thighs while the hips move backward.',
            setup: [
              'Stand close to the Smith bar.',
              'Grip around shoulder width.',
              'Unlock bar with knees soft.'
            ],
            execution: [
              'Slide bar down thighs as hips move back.',
              'Stop at hamstring stretch.',
              'Stand tall and squeeze glutes.'
            ],
            formChecks: [
              'Keep bar close to legs.',
              'Do not round back.',
              'Do not force extra depth.'
            ],
            muscleTarget: 'Hamstrings and glutes with a fixed bar path.'
          },
          {
            kind: 'fallback',
            name: 'Leg Curl Machine',
            machineLooksLike: 'A seated or lying machine with a roller pad near your ankles used to curl heels toward your body.',
            setup: [
              'Align knee with machine pivot.',
              'Set roller just above heels.',
              'Secure thigh or torso pads.'
            ],
            execution: [
              'Curl heels toward your body.',
              'Pause and squeeze hamstrings.',
              'Return slowly.'
            ],
            formChecks: [
              'Do not lift hips off the pad.',
              'Do not kick explosively.',
              'Use full controlled range.'
            ],
            muscleTarget: 'Hamstrings with less hinge complexity.'
          }
        ]
      },
      {
        id: 'wednesday-leg-curl',
        title: 'Leg Curl',
        muscleGroup: 'Hamstrings',
        setCount: 3,
        repRange: '10-15',
        restSeconds: 60,
        options: [
          {
            kind: 'primary',
            name: 'Seated Leg Curl',
            machineLooksLike: 'A chair machine with pads that hold your thighs and a roller behind your lower legs.',
            setup: [
              'Align knees with the pivot point.',
              'Set ankle roller just above heels.',
              'Lock thigh pad snug but not painful.'
            ],
            execution: [
              'Curl heels down and back.',
              'Squeeze hamstrings at the bottom.',
              'Return slowly to the start.'
            ],
            formChecks: [
              'Hips stay in the seat.',
              'Do not let the stack slam.',
              'Avoid partial reps unless fatigued at end.'
            ],
            muscleTarget: 'Hamstrings through knee flexion.'
          },
          {
            kind: 'backup',
            name: 'Lying Leg Curl',
            machineLooksLike: 'A bench where you lie face down with a roller behind your ankles and curl heels toward your glutes.',
            setup: [
              'Lie face down with knees aligned to pivot.',
              'Set roller just above heels.',
              'Hold handles lightly.'
            ],
            execution: [
              'Curl heels toward glutes.',
              'Pause at the top.',
              'Lower under control.'
            ],
            formChecks: [
              'Do not lift hips excessively.',
              'Do not jerk from the bottom.',
              'Keep neck neutral.'
            ],
            muscleTarget: 'Hamstrings using a prone machine path.'
          },
          {
            kind: 'fallback',
            name: 'Extra Romanian Deadlift Set',
            machineLooksLike: 'Repeat the hip hinge pattern with dumbbells or Smith machine.',
            setup: [
              'Use lighter weight than main RDL sets.',
              'Keep stance and bracing the same.',
              'Focus on hamstring stretch.'
            ],
            execution: [
              'Hinge slowly.',
              'Pause briefly near the bottom.',
              'Stand by driving hips forward.'
            ],
            formChecks: [
              'No rounded back.',
              'No rushing reps.',
              'Stop before grip or back dominates.'
            ],
            muscleTarget: 'Hamstring and glute volume if leg curl is taken.'
          }
        ]
      },
      {
        id: 'wednesday-leg-extension',
        title: 'Leg Extension',
        muscleGroup: 'Quads',
        setCount: 3,
        repRange: '10-15',
        restSeconds: 60,
        options: [
          {
            kind: 'primary',
            name: 'Leg Extension Machine',
            machineLooksLike: 'A seated chair machine with a roller pad in front of your shins that lifts as you straighten your knees.',
            setup: [
              'Align knees with the pivot point.',
              'Set pad just above ankles.',
              'Sit back fully against the pad.'
            ],
            execution: [
              'Straighten knees to lift the pad.',
              'Squeeze quads at the top.',
              'Lower slowly.'
            ],
            formChecks: [
              'Do not kick explosively.',
              'Do not let hips rise from the seat.',
              'Use a smooth top squeeze.'
            ],
            muscleTarget: 'Quads on the front of thighs.'
          },
          {
            kind: 'backup',
            name: 'Goblet Squat',
            machineLooksLike: 'One dumbbell held at chest level while squatting.',
            setup: [
              'Hold dumbbell close.',
              'Feet shoulder-width.',
              'Brace core.'
            ],
            execution: [
              'Squat down under control.',
              'Stand tall.',
              'Keep knees tracking over toes.'
            ],
            formChecks: [
              'Do not cave knees inward.',
              'Do not round back.',
              'Keep reps smooth.'
            ],
            muscleTarget: 'Quads and glutes if extension is unavailable.'
          },
          {
            kind: 'fallback',
            name: 'Bodyweight Squat',
            machineLooksLike: 'No equipment movement using your own bodyweight.',
            setup: [
              'Set feet shoulder-width.',
              'Reach arms forward if needed for balance.',
              'Brace abs.'
            ],
            execution: [
              'Squat to comfortable depth.',
              'Stand fully.',
              'Keep steady tempo.'
            ],
            formChecks: [
              'Knees track toes.',
              'Heels stay down.',
              'No collapsing posture.'
            ],
            muscleTarget: 'Basic quad and squat pattern volume.'
          }
        ]
      },
      {
        id: 'wednesday-calf-raise',
        title: 'Calf Raise',
        muscleGroup: 'Calves',
        setCount: 4,
        repRange: '10-15',
        restSeconds: 45,
        options: [
          {
            kind: 'primary',
            name: 'Standing or Seated Calf Raise Machine',
            machineLooksLike: 'Standing version has shoulder pads and a raised foot platform; seated version has pads over the knees.',
            setup: [
              'Put balls of feet on the platform edge.',
              'Start with heels lowered into a stretch.',
              'Keep torso controlled.'
            ],
            execution: [
              'Rise onto toes.',
              'Pause at the top.',
              'Lower slowly to full stretch.'
            ],
            formChecks: [
              'Do not bounce from the bottom.',
              'Use full range.',
              'Keep ankles tracking straight.'
            ],
            muscleTarget: 'Calves through ankle extension.'
          },
          {
            kind: 'backup',
            name: 'Leg Press Calf Raise',
            machineLooksLike: 'Leg press machine used with only the balls of feet on the platform, moving through the ankles.',
            setup: [
              'Place balls of feet low on platform.',
              'Keep knees slightly bent but mostly fixed.',
              'Use safety handles and controlled range.'
            ],
            execution: [
              'Press platform away using toes.',
              'Pause at top.',
              'Let heels sink slowly.'
            ],
            formChecks: [
              'Do not bend and straighten knees like leg press.',
              'Avoid locking knees hard.',
              'Control the stretch.'
            ],
            muscleTarget: 'Calves using the leg press station.'
          },
          {
            kind: 'fallback',
            name: 'Standing Dumbbell Calf Raise',
            machineLooksLike: 'Standing with one or two dumbbells while raising heels off the floor or a small platform.',
            setup: [
              'Hold dumbbells at sides.',
              'Stand near support if balance is needed.',
              'Start with heels down.'
            ],
            execution: [
              'Rise onto toes.',
              'Pause at top.',
              'Lower slowly.'
            ],
            formChecks: [
              'Do not rush reps.',
              'Keep ankles steady.',
              'Use support rather than wobbling.'
            ],
            muscleTarget: 'Calves with minimal equipment.'
          }
        ]
      },
      {
        id: 'wednesday-plank',
        title: 'Plank',
        muscleGroup: 'Core',
        setCount: 3,
        repRange: '30-60 sec',
        restSeconds: 45,
        options: [
          {
            kind: 'primary',
            name: 'Forearm Plank',
            machineLooksLike: 'Floor mat position on forearms and toes with body held straight.',
            setup: [
              'Place elbows under shoulders.',
              'Set feet hip-width.',
              'Brace abs and glutes.'
            ],
            execution: [
              'Hold body straight from shoulders to ankles.',
              'Breathe while staying braced.',
              'Stop before hips sag.'
            ],
            formChecks: [
              'Do not let lower back dip.',
              'Do not hike hips too high.',
              'Keep neck neutral.'
            ],
            muscleTarget: 'Core bracing and trunk stability.'
          },
          {
            kind: 'backup',
            name: 'High Plank',
            machineLooksLike: 'Push-up top position held on hands and toes.',
            setup: [
              'Hands under shoulders.',
              'Feet behind you.',
              'Brace abs.'
            ],
            execution: [
              'Hold straight body line.',
              'Push floor away slightly.',
              'Keep breathing.'
            ],
            formChecks: [
              'No hip sag.',
              'No shoulder shrugging.',
              'Do not hold breath.'
            ],
            muscleTarget: 'Core with shoulder support.'
          },
          {
            kind: 'fallback',
            name: 'Dead Bug',
            machineLooksLike: 'Floor mat movement lying on back with arms and legs raised, lowering opposite arm and leg.',
            setup: [
              'Lie on back with knees over hips.',
              'Press lower back lightly into floor.',
              'Raise arms toward ceiling.'
            ],
            execution: [
              'Lower opposite arm and leg slowly.',
              'Return and switch sides.',
              'Keep ribs down.'
            ],
            formChecks: [
              'Lower back should not arch.',
              'Move slowly.',
              'Use smaller range if needed.'
            ],
            muscleTarget: 'Core control without plank strain.'
          }
        ]
      }
    ]
  },
  {
    id: 'thursday',
    label: 'Thu',
    title: 'Shoulders + Core',
    focus: 'Shoulder width, rear delts, traps, trunk strength',
    warmup: '5-7 minutes cardio plus light shoulder circles and one easy shoulder press warm-up set.',
    finisher: '8 minutes incline walk or bike at easy-moderate effort.',
    muscleNotes: [
      'Front delts help press overhead.',
      'Side delts create shoulder width and respond well to clean light volume.',
      'Rear delts and face pulls help posture and shoulder balance.',
      'Core work should feel like controlled bracing, not neck strain.'
    ],
    exercises: [
      {
        id: 'thursday-shoulder-press',
        title: 'Shoulder Press',
        muscleGroup: 'Shoulders',
        setCount: 3,
        repRange: '8-12',
        restSeconds: 90,
        options: [
          {
            kind: 'primary',
            name: 'Machine Shoulder Press',
            machineLooksLike: 'A seated machine with a back pad and handles beside or above shoulder level that press upward.',
            setup: [
              'Set seat so handles start around shoulder or ear level.',
              'Keep back against the pad.',
              'Plant feet and brace ribs down.'
            ],
            execution: [
              'Press handles overhead.',
              'Stop short of hard elbow lockout.',
              'Lower to shoulder level under control.'
            ],
            formChecks: [
              'Do not arch lower back.',
              'Do not shrug hard at the top.',
              'Keep wrists stacked.'
            ],
            muscleTarget: 'Front and side delts with triceps assistance.'
          },
          {
            kind: 'backup',
            name: 'Seated Dumbbell Shoulder Press',
            machineLooksLike: 'Upright bench with two dumbbells pressed from shoulder level overhead.',
            setup: [
              'Use a bench with back support if possible.',
              'Start dumbbells around shoulder height.',
              'Brace abs before pressing.'
            ],
            execution: [
              'Press dumbbells overhead.',
              'Lower slowly to shoulder height.',
              'Keep forearms vertical.'
            ],
            formChecks: [
              'Do not lean back into an incline press.',
              'Avoid banging dumbbells together.',
              'Use a weight you can stabilize.'
            ],
            muscleTarget: 'Shoulders with more stabilizer demand.'
          },
          {
            kind: 'fallback',
            name: 'Smith Machine Shoulder Press',
            machineLooksLike: 'A fixed barbell on rails, usually with a seated bench under it for overhead pressing.',
            setup: [
              'Place bench so bar travels just in front of face.',
              'Set grip slightly wider than shoulders.',
              'Unlock bar from shoulder height.'
            ],
            execution: [
              'Press bar upward.',
              'Lower to chin or upper chest level if comfortable.',
              'Re-lock carefully after final rep.'
            ],
            formChecks: [
              'Do not force behind-neck range.',
              'Keep ribs down.',
              'Control the fixed path.'
            ],
            muscleTarget: 'Shoulder pressing using guided rails.'
          }
        ]
      },
      {
        id: 'thursday-lateral-raise',
        title: 'Lateral Raise',
        muscleGroup: 'Side Delts',
        setCount: 4,
        repRange: '12-20',
        restSeconds: 45,
        options: [
          {
            kind: 'primary',
            name: 'Dumbbell Lateral Raise',
            machineLooksLike: 'Two light dumbbells raised out to the sides from a standing or seated position.',
            setup: [
              'Choose lighter weight than expected.',
              'Stand tall with slight elbow bend.',
              'Keep shoulders down before raising.'
            ],
            execution: [
              'Raise arms out to sides to shoulder height.',
              'Pause briefly.',
              'Lower slowly.'
            ],
            formChecks: [
              'Do not swing from hips.',
              'Do not shrug into traps.',
              'Lead with elbows, not hands.'
            ],
            muscleTarget: 'Side delts for shoulder width.'
          },
          {
            kind: 'backup',
            name: 'Cable Lateral Raise',
            machineLooksLike: 'Low cable pulley with one handle, performed standing sideways to the tower.',
            setup: [
              'Set pulley low.',
              'Stand sideways with working arm away from the tower.',
              'Start handle across body with slight tension.'
            ],
            execution: [
              'Raise handle out to side to shoulder height.',
              'Pause briefly.',
              'Lower slowly across body.'
            ],
            formChecks: [
              'Do not lean heavily to cheat.',
              'Keep elbow slightly bent.',
              'Use light weight.'
            ],
            muscleTarget: 'Side delt with cable tension through the range.'
          },
          {
            kind: 'fallback',
            name: 'Lateral Raise Machine',
            machineLooksLike: 'A seated machine with pads outside your upper arms that you lift outward.',
            setup: [
              'Set seat so pads contact upper arms comfortably.',
              'Keep chest tall.',
              'Use light-moderate weight.'
            ],
            execution: [
              'Raise pads out and up.',
              'Pause near shoulder height.',
              'Lower slowly.'
            ],
            formChecks: [
              'Do not shrug.',
              'Keep torso still.',
              'Avoid bouncing the pads.'
            ],
            muscleTarget: 'Side delts with guided movement.'
          }
        ]
      },
      {
        id: 'thursday-rear-delt',
        title: 'Rear Delt Fly',
        muscleGroup: 'Rear Delts',
        setCount: 3,
        repRange: '12-15',
        restSeconds: 60,
        options: [
          {
            kind: 'primary',
            name: 'Rear Delt Fly Machine',
            machineLooksLike: 'Often the reverse setup of the pec deck: you face the pad and open handles backward.',
            setup: [
              'Sit facing the pad.',
              'Set handles around shoulder height.',
              'Keep chest against pad.'
            ],
            execution: [
              'Open arms out and back.',
              'Squeeze rear shoulders.',
              'Return slowly.'
            ],
            formChecks: [
              'Do not row with elbows tucked.',
              'Do not arch away from pad.',
              'Use light enough weight to control the arc.'
            ],
            muscleTarget: 'Rear delts and upper-back balance.'
          },
          {
            kind: 'backup',
            name: 'Cable Rear Delt Fly',
            machineLooksLike: 'Dual cable tower or single cable used to pull arms outward across the body.',
            setup: [
              'Set pulleys near shoulder height if using dual cables.',
              'Use light weight.',
              'Start arms crossed or handles in front.'
            ],
            execution: [
              'Pull arms outward and back.',
              'Pause when arms are wide.',
              'Return slowly.'
            ],
            formChecks: [
              'Do not shrug.',
              'Do not bend elbows more during the rep.',
              'Keep movement wide.'
            ],
            muscleTarget: 'Rear delt isolation with cable control.'
          },
          {
            kind: 'fallback',
            name: 'Bent-Over Dumbbell Rear Delt Raise',
            machineLooksLike: 'Two light dumbbells lifted out to the sides while hinged forward.',
            setup: [
              'Hold light dumbbells.',
              'Hinge forward with flat back.',
              'Let arms hang below shoulders.'
            ],
            execution: [
              'Raise arms out to sides.',
              'Pause briefly.',
              'Lower slowly.'
            ],
            formChecks: [
              'No swinging.',
              'Keep neck neutral.',
              'Use very light weight.'
            ],
            muscleTarget: 'Rear delts without a machine.'
          }
        ]
      },
      {
        id: 'thursday-face-pull',
        title: 'Face Pull',
        muscleGroup: 'Rear Delts + Upper Back',
        setCount: 3,
        repRange: '12-15',
        restSeconds: 60,
        options: [
          {
            kind: 'primary',
            name: 'Cable Rope Face Pull',
            machineLooksLike: 'Cable tower with pulley set around face or upper-chest height and a rope attachment.',
            setup: [
              'Set pulley around face height.',
              'Hold rope ends with thumbs pointing back.',
              'Step back until cable is taut.'
            ],
            execution: [
              'Pull rope toward your face.',
              'Separate rope ends as elbows go out.',
              'Return slowly.'
            ],
            formChecks: [
              'Do not lean far backward.',
              'Do not turn it into a row to the chest.',
              'Keep shoulders down.'
            ],
            muscleTarget: 'Rear delts, external rotators, and upper-back posture.'
          },
          {
            kind: 'backup',
            name: 'Rear Delt Fly Machine',
            machineLooksLike: 'Reverse pec deck machine with chest against pad and handles opening outward.',
            setup: [
              'Use same rear delt setup as previous movement.',
              'Pick lighter weight for higher reps.',
              'Keep chest on pad.'
            ],
            execution: [
              'Open arms wide.',
              'Pause and squeeze.',
              'Return slowly.'
            ],
            formChecks: [
              'No jerking.',
              'No shrugging.',
              'Keep elbows slightly bent.'
            ],
            muscleTarget: 'Rear delt volume when cable is occupied.'
          },
          {
            kind: 'fallback',
            name: 'Band Pull-Apart',
            machineLooksLike: 'A resistance band held in both hands and pulled apart at chest height.',
            setup: [
              'Hold band at chest height.',
              'Hands shoulder-width or wider.',
              'Keep ribs down.'
            ],
            execution: [
              'Pull band apart until arms are wide.',
              'Squeeze shoulder blades lightly.',
              'Return slowly.'
            ],
            formChecks: [
              'Do not shrug.',
              'Do not arch your back.',
              'Use controlled tension.'
            ],
            muscleTarget: 'Rear delts and upper back with minimal equipment.'
          }
        ]
      },
      {
        id: 'thursday-shrugs',
        title: 'Shrugs',
        muscleGroup: 'Traps',
        setCount: 3,
        repRange: '10-15',
        restSeconds: 60,
        options: [
          {
            kind: 'primary',
            name: 'Dumbbell Shrug',
            machineLooksLike: 'Two dumbbells held at your sides while shoulders move straight up and down.',
            setup: [
              'Hold dumbbells at sides.',
              'Stand tall.',
              'Let shoulders sit naturally before each rep.'
            ],
            execution: [
              'Shrug shoulders straight up.',
              'Pause briefly.',
              'Lower fully.'
            ],
            formChecks: [
              'Do not roll shoulders in circles.',
              'Do not bend elbows to curl weight.',
              'Keep neck relaxed.'
            ],
            muscleTarget: 'Upper traps.'
          },
          {
            kind: 'backup',
            name: 'Smith Machine Shrug',
            machineLooksLike: 'Smith machine bar held in front of the thighs while shrugging upward.',
            setup: [
              'Stand close to bar.',
              'Grip just outside hips.',
              'Unlock bar and stand tall.'
            ],
            execution: [
              'Raise shoulders straight up.',
              'Pause.',
              'Lower fully.'
            ],
            formChecks: [
              'No shoulder circles.',
              'No bouncing with knees.',
              'Do not crane neck forward.'
            ],
            muscleTarget: 'Upper traps with guided bar path.'
          },
          {
            kind: 'fallback',
            name: 'Skip Shrugs',
            machineLooksLike: 'No equipment. Use this if neck or traps feel tight from work or previous exercises.',
            setup: [
              'Skip the movement entirely.',
              'Use the saved time for a slower finisher.',
              'Log that traps or neck felt tight.'
            ],
            execution: [
              'No reps required.',
              'Keep the workout moving.',
              'Return next week if shoulders feel normal.'
            ],
            formChecks: [
              'Skipping is better than forcing neck discomfort.',
              'Do not replace with random heavy pulls.',
              'Keep the plan sustainable.'
            ],
            muscleTarget: 'Recovery-preserving option.'
          }
        ]
      },
      {
        id: 'thursday-cable-crunch',
        title: 'Cable Crunch',
        muscleGroup: 'Abs',
        setCount: 3,
        repRange: '10-15',
        restSeconds: 45,
        options: [
          {
            kind: 'primary',
            name: 'Cable Rope Crunch',
            machineLooksLike: 'Cable tower with rope attached high while you kneel facing the machine.',
            setup: [
              'Attach rope to high pulley.',
              'Kneel facing the tower.',
              'Hold rope beside your head.'
            ],
            execution: [
              'Crunch ribs toward pelvis.',
              'Keep hips mostly fixed.',
              'Return slowly without standing up.'
            ],
            formChecks: [
              'Do not just pull with arms.',
              'Do not sit back into a hip hinge.',
              'Keep abs doing the curl.'
            ],
            muscleTarget: 'Abs through loaded spinal flexion.'
          },
          {
            kind: 'backup',
            name: 'Ab Crunch Machine',
            machineLooksLike: 'A seated machine with handles or pads near the chest that you curl forward against resistance.',
            setup: [
              'Set seat and chest/arm pads comfortably.',
              'Choose light-moderate weight.',
              'Brace before curling.'
            ],
            execution: [
              'Curl torso forward.',
              'Squeeze abs.',
              'Return slowly.'
            ],
            formChecks: [
              'Do not yank with arms.',
              'Do not use a tiny range.',
              'Keep movement controlled.'
            ],
            muscleTarget: 'Abs with guided machine resistance.'
          },
          {
            kind: 'fallback',
            name: 'Floor Crunch',
            machineLooksLike: 'Mat exercise lying on back with knees bent and upper back curling off the floor.',
            setup: [
              'Lie on mat with knees bent.',
              'Hands lightly behind head or across chest.',
              'Keep lower back comfortable.'
            ],
            execution: [
              'Curl upper back up.',
              'Squeeze abs.',
              'Lower slowly.'
            ],
            formChecks: [
              'Do not pull neck.',
              'Do not rush reps.',
              'Exhale as you crunch.'
            ],
            muscleTarget: 'Basic ab work.'
          }
        ]
      },
      {
        id: 'thursday-knee-raise',
        title: 'Knee Raise',
        muscleGroup: 'Lower Abs + Hip Flexors',
        setCount: 3,
        repRange: '10-15',
        restSeconds: 45,
        options: [
          {
            kind: 'primary',
            name: 'Captain’s Chair Knee Raise',
            machineLooksLike: 'A vertical station with back support, forearm pads, and handles where your legs hang freely.',
            setup: [
              'Place forearms on pads and back against support.',
              'Grip handles lightly.',
              'Let legs hang before starting.'
            ],
            execution: [
              'Raise knees toward chest.',
              'Pause briefly.',
              'Lower slowly without swinging.'
            ],
            formChecks: [
              'Do not swing legs.',
              'Do not shrug shoulders into ears.',
              'Control the lowering.'
            ],
            muscleTarget: 'Lower abs, hip flexors, and core control.'
          },
          {
            kind: 'backup',
            name: 'Hanging Knee Raise',
            machineLooksLike: 'Pull-up bar position where you hang from hands and raise knees.',
            setup: [
              'Grip pull-up bar firmly.',
              'Hang with shoulders active.',
              'Start with legs still.'
            ],
            execution: [
              'Raise knees toward chest.',
              'Pause.',
              'Lower slowly.'
            ],
            formChecks: [
              'No swinging.',
              'Stop before grip fails.',
              'Keep reps controlled.'
            ],
            muscleTarget: 'Core plus grip and shoulder stability.'
          },
          {
            kind: 'fallback',
            name: 'Reverse Crunch',
            machineLooksLike: 'Floor mat movement lying on back and curling hips upward.',
            setup: [
              'Lie on back with knees bent.',
              'Place hands beside you.',
              'Brace abs.'
            ],
            execution: [
              'Bring knees toward chest.',
              'Curl hips slightly off floor.',
              'Lower slowly.'
            ],
            formChecks: [
              'Do not use momentum.',
              'Keep movement small and controlled.',
              'Do not strain neck.'
            ],
            muscleTarget: 'Core without hanging equipment.'
          }
        ]
      }
    ]
  },
  {
    id: 'friday',
    label: 'Fri',
    title: 'Full Body + Weak Points',
    focus: 'Weekly completion, moderate volume, habit reinforcement',
    warmup: '5-7 minutes easy cardio plus one light set of the first lower-body movement.',
    finisher: '10 minutes cardio: bike for recovery, incline treadmill for conditioning, elliptical for lower impact, or slow walk if cooked.',
    muscleNotes: [
      'Friday is not supposed to crush you.',
      'Use this day to fill gaps if a weekday was missed.',
      'Keep rests tighter and reps clean.'
    ],
    exercises: [
      {
        id: 'friday-lower',
        title: 'Lower Body Pattern',
        muscleGroup: 'Quads + Glutes',
        setCount: 3,
        repRange: '10-12',
        restSeconds: 75,
        options: [
          {
            kind: 'primary',
            name: 'Goblet Squat',
            machineLooksLike: 'One dumbbell held vertically at the chest while squatting.',
            setup: [
              'Hold dumbbell close to chest.',
              'Stand shoulder-width with toes slightly out.',
              'Brace before lowering.'
            ],
            execution: [
              'Squat to comfortable depth.',
              'Stand tall through mid-foot.',
              'Keep reps smooth.'
            ],
            formChecks: [
              'Knees track toes.',
              'Chest stays lifted.',
              'Do not rush.'
            ],
            muscleTarget: 'Quads and glutes with low setup time.'
          },
          {
            kind: 'backup',
            name: 'Leg Press',
            machineLooksLike: 'Large angled seated platform press machine.',
            setup: [
              'Feet shoulder-width on platform.',
              'Back flat against pad.',
              'Use moderate weight.'
            ],
            execution: [
              'Lower to comfortable depth.',
              'Press up under control.',
              'Avoid hard lockout.'
            ],
            formChecks: [
              'Do not let knees cave.',
              'Do not lift hips.',
              'Control each rep.'
            ],
            muscleTarget: 'Lower-body volume if goblet setup is not ideal.'
          },
          {
            kind: 'fallback',
            name: 'Bodyweight Squat',
            machineLooksLike: 'No equipment, controlled squat pattern.',
            setup: [
              'Feet shoulder-width.',
              'Arms forward for balance.',
              'Brace abs.'
            ],
            execution: [
              'Squat smoothly.',
              'Stand fully.',
              'Use tempo to make reps useful.'
            ],
            formChecks: [
              'No knee cave.',
              'No bouncing.',
              'Keep heels down.'
            ],
            muscleTarget: 'Pattern practice and easy volume.'
          }
        ]
      },
      {
        id: 'friday-chest',
        title: 'Chest Pattern',
        muscleGroup: 'Chest',
        setCount: 3,
        repRange: '10-12',
        restSeconds: 75,
        options: [
          {
            kind: 'primary',
            name: 'Dumbbell Bench Press',
            machineLooksLike: 'Flat bench with two dumbbells pressed from chest level.',
            setup: [
              'Lie on flat bench with dumbbells at chest level.',
              'Feet flat.',
              'Shoulder blades slightly tucked.'
            ],
            execution: [
              'Press dumbbells upward.',
              'Lower slowly to chest level.',
              'Keep wrists over elbows.'
            ],
            formChecks: [
              'Do not flare elbows straight out.',
              'Do not bounce at bottom.',
              'Do not lose dumbbell control.'
            ],
            muscleTarget: 'Chest and triceps with free-weight control.'
          },
          {
            kind: 'backup',
            name: 'Machine Chest Press',
            machineLooksLike: 'Seated chest press with handles and back pad.',
            setup: [
              'Set handles at mid-chest.',
              'Back on pad.',
              'Feet planted.'
            ],
            execution: [
              'Press forward.',
              'Lower under control.',
              'Keep tension.'
            ],
            formChecks: [
              'Shoulders down.',
              'Wrists straight.',
              'No pad bounce.'
            ],
            muscleTarget: 'Chest volume if benches are busy.'
          },
          {
            kind: 'fallback',
            name: 'Push-Up',
            machineLooksLike: 'Bodyweight chest press from the floor or hands elevated on a bench.',
            setup: [
              'Hands slightly wider than shoulders.',
              'Body straight.',
              'Use incline version if needed.'
            ],
            execution: [
              'Lower chest toward floor or bench.',
              'Press back up.',
              'Stop before form breaks.'
            ],
            formChecks: [
              'No hip sag.',
              'No half reps unless fatigued.',
              'Elbows track naturally.'
            ],
            muscleTarget: 'Chest and triceps without equipment.'
          }
        ]
      },
      {
        id: 'friday-back',
        title: 'Back Pattern',
        muscleGroup: 'Back',
        setCount: 3,
        repRange: '10-12',
        restSeconds: 75,
        options: [
          {
            kind: 'primary',
            name: 'Lat Pulldown',
            machineLooksLike: 'Seated high cable pulldown with thigh pads and overhead bar.',
            setup: [
              'Lock thighs under pad.',
              'Grip bar or neutral handles.',
              'Set shoulders down.'
            ],
            execution: [
              'Pull elbows down.',
              'Bring bar to upper chest.',
              'Return slowly.'
            ],
            formChecks: [
              'No behind-neck reps.',
              'No lower-back yank.',
              'Keep lats engaged.'
            ],
            muscleTarget: 'Lats and upper back.'
          },
          {
            kind: 'backup',
            name: 'Seated Cable Row',
            machineLooksLike: 'Low cable row station with seat, foot plates, and handle.',
            setup: [
              'Feet on plates.',
              'Sit tall.',
              'Arms long at start.'
            ],
            execution: [
              'Pull to lower ribs.',
              'Squeeze shoulder blades.',
              'Return slowly.'
            ],
            formChecks: [
              'No rocking.',
              'No shrugging.',
              'Elbows drive back.'
            ],
            muscleTarget: 'Mid-back and lats.'
          },
          {
            kind: 'fallback',
            name: 'Chest-Supported Row',
            machineLooksLike: 'Seated row machine with chest pad and handles.',
            setup: [
              'Chest against pad.',
              'Handles at rib height.',
              'Feet stable.'
            ],
            execution: [
              'Pull handles back.',
              'Pause briefly.',
              'Lower slowly.'
            ],
            formChecks: [
              'Chest stays on pad.',
              'Shoulders stay down.',
              'No jerking.'
            ],
            muscleTarget: 'Mid-back with machine support.'
          }
        ]
      },
      {
        id: 'friday-hinge',
        title: 'Hip Hinge / Hamstrings',
        muscleGroup: 'Hamstrings + Glutes',
        setCount: 2,
        repRange: '10-12',
        restSeconds: 75,
        options: [
          {
            kind: 'primary',
            name: 'Dumbbell Romanian Deadlift',
            machineLooksLike: 'Two dumbbells lowered along the legs while the hips move backward.',
            setup: [
              'Feet hip-width.',
              'Dumbbells in front of thighs.',
              'Soft knees.'
            ],
            execution: [
              'Hinge hips back.',
              'Stop at hamstring stretch.',
              'Stand tall.'
            ],
            formChecks: [
              'Flat back.',
              'No squat pattern.',
              'No forced depth.'
            ],
            muscleTarget: 'Hamstrings and glutes.'
          },
          {
            kind: 'backup',
            name: 'Smith Machine Romanian Deadlift',
            machineLooksLike: 'Fixed Smith bar lowered along the thighs in a hip hinge.',
            setup: [
              'Stand close to bar.',
              'Grip shoulder-width.',
              'Brace before lowering.'
            ],
            execution: [
              'Slide bar down legs.',
              'Pause at stretch.',
              'Drive hips forward.'
            ],
            formChecks: [
              'Bar stays close.',
              'Back flat.',
              'No bouncing.'
            ],
            muscleTarget: 'Hamstrings with guided bar path.'
          },
          {
            kind: 'fallback',
            name: 'Leg Curl Machine',
            machineLooksLike: 'Seated or lying hamstring curl machine with ankle roller.',
            setup: [
              'Align knees with pivot.',
              'Set ankle roller just above heels.',
              'Secure pads.'
            ],
            execution: [
              'Curl heels in.',
              'Squeeze hamstrings.',
              'Return slowly.'
            ],
            formChecks: [
              'No hip lifting.',
              'No kicking.',
              'Full control.'
            ],
            muscleTarget: 'Hamstrings when hinge setup is unavailable.'
          }
        ]
      },
      {
        id: 'friday-lateral',
        title: 'Shoulder Width',
        muscleGroup: 'Side Delts',
        setCount: 2,
        repRange: '12-15',
        restSeconds: 45,
        options: [
          {
            kind: 'primary',
            name: 'Cable Lateral Raise',
            machineLooksLike: 'Low cable pulley with one handle used while standing sideways.',
            setup: [
              'Set low pulley.',
              'Stand sideways.',
              'Start with cable under tension.'
            ],
            execution: [
              'Raise arm to shoulder height.',
              'Pause.',
              'Lower slowly.'
            ],
            formChecks: [
              'No leaning cheat.',
              'No shrugging.',
              'Light weight.'
            ],
            muscleTarget: 'Side delts.'
          },
          {
            kind: 'backup',
            name: 'Dumbbell Lateral Raise',
            machineLooksLike: 'Two light dumbbells raised out to the sides.',
            setup: [
              'Stand tall.',
              'Slight elbow bend.',
              'Shoulders down.'
            ],
            execution: [
              'Raise to shoulder height.',
              'Pause.',
              'Lower slowly.'
            ],
            formChecks: [
              'No swing.',
              'No trap shrug.',
              'Lead with elbows.'
            ],
            muscleTarget: 'Side delts.'
          },
          {
            kind: 'fallback',
            name: 'Lateral Raise Machine',
            machineLooksLike: 'Seated machine with pads outside your arms.',
            setup: [
              'Set pads at upper arms.',
              'Sit tall.',
              'Pick light weight.'
            ],
            execution: [
              'Lift pads outward.',
              'Pause.',
              'Lower slowly.'
            ],
            formChecks: [
              'No bouncing.',
              'No shrugging.',
              'Controlled reps.'
            ],
            muscleTarget: 'Side delts.'
          }
        ]
      },
      {
        id: 'friday-pushdown',
        title: 'Triceps Volume',
        muscleGroup: 'Triceps',
        setCount: 2,
        repRange: '12-15',
        restSeconds: 45,
        options: [
          {
            kind: 'primary',
            name: 'Rope Pushdown',
            machineLooksLike: 'High cable pulley with rope attachment.',
            setup: [
              'Stand close to tower.',
              'Elbows at sides.',
              'Hold rope ends.'
            ],
            execution: [
              'Push rope down.',
              'Separate ends at bottom.',
              'Return slowly.'
            ],
            formChecks: [
              'No shoulder swing.',
              'Elbows stay close.',
              'No leaning into reps.'
            ],
            muscleTarget: 'Triceps.'
          },
          {
            kind: 'backup',
            name: 'Dumbbell Overhead Extension',
            machineLooksLike: 'One dumbbell held with both hands overhead.',
            setup: [
              'Hold dumbbell by one end.',
              'Elbows near head.',
              'Brace ribs down.'
            ],
            execution: [
              'Lower behind head.',
              'Extend upward.',
              'Control stretch.'
            ],
            formChecks: [
              'No forced shoulder pain.',
              'No flared elbows.',
              'No back arch.'
            ],
            muscleTarget: 'Triceps long head.'
          },
          {
            kind: 'fallback',
            name: 'Machine Dip',
            machineLooksLike: 'Seated machine where handles beside the torso press downward.',
            setup: [
              'Set seat so handles are near lower ribs.',
              'Start light.',
              'Keep shoulders down.'
            ],
            execution: [
              'Press handles downward.',
              'Pause near lockout.',
              'Return slowly.'
            ],
            formChecks: [
              'No shoulder roll.',
              'No bounce.',
              'Controlled range.'
            ],
            muscleTarget: 'Triceps with chest assistance.'
          }
        ]
      },
      {
        id: 'friday-curl',
        title: 'Biceps Volume',
        muscleGroup: 'Biceps',
        setCount: 2,
        repRange: '12-15',
        restSeconds: 45,
        options: [
          {
            kind: 'primary',
            name: 'Dumbbell Curl',
            machineLooksLike: 'Two dumbbells curled from the sides while standing or seated.',
            setup: [
              'Stand tall.',
              'Elbows close.',
              'Wrists neutral.'
            ],
            execution: [
              'Curl up.',
              'Squeeze briefly.',
              'Lower slowly.'
            ],
            formChecks: [
              'No hip swing.',
              'No elbow drift.',
              'Full controlled range.'
            ],
            muscleTarget: 'Biceps.'
          },
          {
            kind: 'backup',
            name: 'Cable Curl',
            machineLooksLike: 'Low cable station with bar or rope curled upward.',
            setup: [
              'Set pulley low.',
              'Stand facing tower.',
              'Elbows near sides.'
            ],
            execution: [
              'Curl handle upward.',
              'Pause.',
              'Lower slowly.'
            ],
            formChecks: [
              'No leaning back.',
              'No shoulder roll.',
              'No stack slam.'
            ],
            muscleTarget: 'Biceps with cable tension.'
          },
          {
            kind: 'fallback',
            name: 'Hammer Curl',
            machineLooksLike: 'Dumbbells curled with palms facing inward.',
            setup: [
              'Hold dumbbells at sides.',
              'Palms inward.',
              'Elbows close.'
            ],
            execution: [
              'Curl without rotating wrists.',
              'Pause.',
              'Lower fully.'
            ],
            formChecks: [
              'No swing.',
              'No shoulder shrug.',
              'Same reps both arms.'
            ],
            muscleTarget: 'Biceps, brachialis, and forearms.'
          }
        ]
      }
    ]
  }
]

export const defaultWeekday: WorkoutDay['id'] = 'monday'
