import type { ExerciseOption, OptionKind, WorkoutDay } from '../types'

type HomeOption = {
  kind: OptionKind
  name: string
  description: string
  setup: string
  execution: string
  formCheck: string
  target: string
}

const homeOption = ({ kind, name, description, setup, execution, formCheck, target }: HomeOption): ExerciseOption => ({
  kind,
  name,
  machineLooksLike: `${description} This is a bodyweight movement with no equipment required.`,
  setup: ['Clear enough floor space to move safely and wear shoes if the floor is slippery.', setup],
  execution: [execution, 'Keep each rep controlled and stop the set before technique breaks down.'],
  formChecks: [formCheck, 'Muscle effort is expected; stop for sharp or joint pain.'],
  muscleTarget: target
})

export const homeBodyweightPlan: WorkoutDay[] = [
  {
    id: 'monday',
    label: 'Mon',
    title: 'Push + Posture',
    focus: 'Chest, shoulders, triceps, and upper-back control',
    warmup: '5 minutes: easy marching, arm circles, wall slides, and 5 slow practice push-ups at an easy angle.',
    finisher: 'Complete 3 easy rounds of 20 seconds fast punches and 40 seconds relaxed marching.',
    muscleNotes: [
      'Use an easier push-up angle whenever your hips or shoulders lose position.',
      'Keep two clean reps in reserve during the first two weeks.',
      'Progress with reps, slower lowering, or a harder variation before adding external load.'
    ],
    exercises: [
      {
        id: 'home-monday-push-up', title: 'Push-Up', muscleGroup: 'Chest', setCount: 3, repRange: '8-15', restSeconds: 90,
        options: [
          homeOption({ kind: 'primary', name: 'Floor Push-Up', description: 'A straight-body press from hands and toes on the floor.', setup: 'Place hands just outside shoulder width and brace from ribs to glutes.', execution: 'Lower your chest between your hands, then press the floor away.', formCheck: 'Keep elbows about 30-60 degrees from your torso and hips level.', target: 'Chest, triceps, and front shoulders.' }),
          homeOption({ kind: 'backup', name: 'Incline Push-Up', description: 'A push-up with hands on a sturdy counter, desk, or wall ledge.', setup: 'Choose a surface that cannot slide and walk your feet back into a straight line.', execution: 'Bring your chest toward the edge, pause, and press away.', formCheck: 'Do not let your hips sag or your shoulders shrug.', target: 'Chest and triceps with reduced bodyweight resistance.' }),
          homeOption({ kind: 'fallback', name: 'Wall Push-Up', description: 'A standing push-up against a clear wall.', setup: 'Set hands at chest height and step far enough back to create gentle resistance.', execution: 'Bend your elbows until your chest nears the wall, then press to standing.', formCheck: 'Keep heels grounded and move your body as one unit.', target: 'Chest and triceps at an accessible starting level.' })
        ]
      },
      {
        id: 'home-monday-shoulder-press', title: 'Bodyweight Shoulder Press', muscleGroup: 'Shoulders', setCount: 3, repRange: '6-12', restSeconds: 90,
        options: [
          homeOption({ kind: 'primary', name: 'Pike Push-Up', description: 'An inverted-V press with hips high and head moving toward the floor.', setup: 'Start on hands and feet, then walk feet forward until hips rise above shoulders.', execution: 'Bend elbows and lower the crown of your head between your hands, then press up.', formCheck: 'Keep weight moving toward your hands instead of turning the rep into a regular push-up.', target: 'Shoulders and triceps.' }),
          homeOption({ kind: 'backup', name: 'Wide Pike Push-Up', description: 'A short-range pike press with a wider base and bent knees.', setup: 'Set hands slightly wider than shoulders, bend knees, and raise hips comfortably.', execution: 'Lower only as far as you can control, then press the floor away.', formCheck: 'Keep your neck neutral and elbows tracking consistently.', target: 'Shoulders with a more stable base.' }),
          homeOption({ kind: 'fallback', name: 'Wall Shoulder Press', description: 'A standing diagonal press into a wall.', setup: 'Place hands above shoulder height and lean toward the wall with a braced body.', execution: 'Bend elbows to bring your forehead toward the wall, then press away.', formCheck: 'Keep ribs down and avoid arching your lower back.', target: 'Shoulders and triceps with light resistance.' })
        ]
      },
      {
        id: 'home-monday-triceps', title: 'Close-Grip Press', muscleGroup: 'Triceps', setCount: 3, repRange: '8-15', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Close-Grip Push-Up', description: 'A floor push-up with hands just inside shoulder width.', setup: 'Set hands under your chest and brace your whole body.', execution: 'Lower with elbows close to your sides and press to full arm extension.', formCheck: 'Keep wrists comfortable and elbows from flaring wide.', target: 'Triceps with chest assistance.' }),
          homeOption({ kind: 'backup', name: 'Kneeling Close-Grip Push-Up', description: 'A close-grip push-up supported by hands and knees.', setup: 'Place knees behind hips so your body stays straight from knees to shoulders.', execution: 'Lower your chest between your hands and press up without rocking back.', formCheck: 'Keep hips forward and elbows tucked.', target: 'Triceps with reduced resistance.' }),
          homeOption({ kind: 'fallback', name: 'Wall Triceps Press', description: 'A close-hand wall press driven by elbow extension.', setup: 'Place hands close together at chest height and step back.', execution: 'Bring your forehead toward your hands, then straighten your elbows to press away.', formCheck: 'Keep upper arms steady and ribs stacked over hips.', target: 'Triceps at an accessible angle.' })
        ]
      },
      {
        id: 'home-monday-posture', title: 'Prone Shoulder Series', muscleGroup: 'Upper Back', setCount: 2, repRange: '8-12', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Prone Y-T-W', description: 'A face-down sequence lifting the arms in Y, T, and W shapes.', setup: 'Lie face down with forehead hovering just above the floor and legs relaxed.', execution: 'Lift into a Y, then T, then W; count the full sequence as one rep.', formCheck: 'Use a small range and keep shoulders away from your ears.', target: 'Rear shoulders, mid-back, and shoulder stabilizers.' }),
          homeOption({ kind: 'backup', name: 'Prone W Raise', description: 'A face-down shoulder-blade squeeze with elbows bent into a W.', setup: 'Lie face down, bend elbows, and turn thumbs upward.', execution: 'Lift hands and elbows slightly while drawing shoulder blades down and together.', formCheck: 'Do not lift by cranking your neck or lower back.', target: 'Mid-back and rear shoulders.' }),
          homeOption({ kind: 'fallback', name: 'Standing Wall Slide', description: 'A standing arm slide against a wall.', setup: 'Stand with back near a wall and place forearms against it if comfortable.', execution: 'Slide arms upward, then pull elbows back down slowly.', formCheck: 'Keep ribs down and use only a pain-free range.', target: 'Upper back and shoulder mobility.' })
        ]
      }
    ]
  },
  {
    id: 'tuesday',
    label: 'Tue',
    title: 'Legs + Glutes',
    focus: 'Squat, single-leg strength, hips, and calves',
    warmup: '5 minutes: marching, 10 hip hinges, 10 easy squats, and alternating knee hugs.',
    finisher: 'Walk briskly around your home or march in place for 6 minutes at a conversational pace.',
    muscleNotes: [
      'Use a wall or sturdy counter for balance without turning it into an arm exercise.',
      'Control the lowering phase for about three seconds when the written reps become easy.',
      'Knees should track in the same direction as your toes.'
    ],
    exercises: [
      {
        id: 'home-tuesday-squat', title: 'Bodyweight Squat', muscleGroup: 'Quads + Glutes', setCount: 3, repRange: '10-20', restSeconds: 90,
        options: [
          homeOption({ kind: 'primary', name: 'Tempo Squat', description: 'A bodyweight squat with a slow three-second lowering phase.', setup: 'Stand around shoulder width with toes turned out slightly.', execution: 'Sit down between your hips for three seconds, pause, then stand tall.', formCheck: 'Keep your whole foot planted and knees tracking over toes.', target: 'Quads, glutes, and inner thighs.' }),
          homeOption({ kind: 'backup', name: 'Box Squat to Chair', description: 'A controlled squat to a sturdy chair before standing again.', setup: 'Place a chair behind you against a wall so it cannot slide.', execution: 'Reach hips back, touch the chair lightly, and stand without rocking.', formCheck: 'Keep tension instead of dropping onto the seat.', target: 'Quads and glutes with a consistent depth target.' }),
          homeOption({ kind: 'fallback', name: 'Counter-Supported Squat', description: 'A squat while lightly holding a sturdy counter for balance.', setup: 'Hold the counter with relaxed arms and place feet at a comfortable width.', execution: 'Sit down under control and use your legs to stand.', formCheck: 'Use the hands only for balance, not to pull yourself up.', target: 'Quads and glutes with added stability.' })
        ]
      },
      {
        id: 'home-tuesday-lunge', title: 'Reverse Lunge', muscleGroup: 'Legs', setCount: 3, repRange: '8-12 / side', restSeconds: 90,
        options: [
          homeOption({ kind: 'primary', name: 'Alternating Reverse Lunge', description: 'A standing lunge made by stepping one foot backward at a time.', setup: 'Stand tall with feet under hips and brace your trunk.', execution: 'Step back, lower both knees, drive through the front foot, and alternate sides.', formCheck: 'Keep the front foot flat and torso tall.', target: 'Quads, glutes, and hip stabilizers.' }),
          homeOption({ kind: 'backup', name: 'Supported Reverse Lunge', description: 'A reverse lunge with one hand on a sturdy wall or counter.', setup: 'Stand beside your support and keep the supporting arm relaxed.', execution: 'Step back and lower only as far as balance and control allow.', formCheck: 'Do not pull hard with the support hand.', target: 'Quads and glutes with improved balance.' }),
          homeOption({ kind: 'fallback', name: 'Split Squat Hold', description: 'A stationary split stance with a shallow controlled lowering.', setup: 'Take a comfortable staggered stance and hold a wall if needed.', execution: 'Lower a few inches, pause, and press through the front foot to rise.', formCheck: 'Keep both feet planted and use a pain-free depth.', target: 'Legs and hips without repeated stepping.' })
        ]
      },
      {
        id: 'home-tuesday-bridge', title: 'Glute Bridge', muscleGroup: 'Glutes', setCount: 3, repRange: '12-20', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Single-Leg Glute Bridge', description: 'A floor hip raise using one planted foot.', setup: 'Lie on your back, plant one foot near your hips, and lift the other leg.', execution: 'Drive through the planted heel and raise hips until glutes fully tighten.', formCheck: 'Keep hips level and avoid pushing through your lower back.', target: 'Glutes and hamstrings one side at a time.' }),
          homeOption({ kind: 'backup', name: 'Glute Bridge', description: 'A two-foot floor hip raise.', setup: 'Lie on your back with knees bent and feet flat near your hips.', execution: 'Press through both feet, squeeze glutes at the top, and lower slowly.', formCheck: 'Finish with glutes rather than over-arching your back.', target: 'Glutes and hamstrings.' }),
          homeOption({ kind: 'fallback', name: 'Bridge Iso Hold', description: 'A two-foot bridge held at a comfortable height.', setup: 'Set up as for a glute bridge and brace your abdomen.', execution: 'Lift into a strong bridge and hold while breathing normally.', formCheck: 'Keep ribs down and pressure even through both feet.', target: 'Glute endurance and hip stability.' })
        ]
      },
      {
        id: 'home-tuesday-calves', title: 'Calf Raise', muscleGroup: 'Calves', setCount: 3, repRange: '12-25', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Single-Leg Calf Raise', description: 'A standing heel raise using one leg and light wall support.', setup: 'Stand tall beside a wall and float one foot off the floor.', execution: 'Rise as high as possible on the working foot, pause, and lower fully.', formCheck: 'Keep the ankle from rolling outward and avoid bouncing.', target: 'Calf strength one side at a time.' }),
          homeOption({ kind: 'backup', name: 'Two-Leg Calf Raise', description: 'A standing heel raise on both feet.', setup: 'Stand with feet parallel and fingertips on a wall if needed.', execution: 'Rise onto the balls of both feet, pause, and lower slowly.', formCheck: 'Move straight up and keep pressure across the big toes.', target: 'Calves.' }),
          homeOption({ kind: 'fallback', name: 'Seated Calf Raise', description: 'A heel raise performed while seated with feet flat.', setup: 'Sit near the front of a sturdy chair with knees over ankles.', execution: 'Lift both heels as high as possible, pause, and lower.', formCheck: 'Keep toes planted and avoid rocking your torso.', target: 'Calves with minimal balance demand.' })
        ]
      }
    ]
  },
  {
    id: 'wednesday',
    label: 'Wed',
    title: 'Core + Conditioning',
    focus: 'Trunk control, coordination, and low-space cardio',
    warmup: '5 minutes: easy marching, trunk rotations, cat-cow, and 5 slow dead bugs per side.',
    finisher: 'Repeat 30 seconds brisk march and 30 seconds easy march for 8 minutes.',
    muscleNotes: [
      'Quality breathing and trunk position matter more than speed.',
      'Choose the low-impact option if jumping bothers your joints or neighbors.',
      'You should finish energized, not flattened, for Thursday training.'
    ],
    exercises: [
      {
        id: 'home-wednesday-dead-bug', title: 'Dead Bug', muscleGroup: 'Core', setCount: 3, repRange: '8-12 / side', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Full Dead Bug', description: 'A back-lying opposite arm and leg reach.', setup: 'Lie on your back with hips and knees at 90 degrees and arms above shoulders.', execution: 'Reach one arm and the opposite leg away, return, and alternate.', formCheck: 'Keep your lower back gently connected to the floor.', target: 'Deep core and cross-body control.' }),
          homeOption({ kind: 'backup', name: 'Heel-Tap Dead Bug', description: 'A back-lying alternating heel tap with arms still.', setup: 'Lie on your back with knees over hips and arms resting by your sides.', execution: 'Lower one heel to tap the floor, return, and switch sides.', formCheck: 'Only lower as far as your back position stays steady.', target: 'Deep core with reduced coordination demand.' }),
          homeOption({ kind: 'fallback', name: 'Supine March', description: 'A back-lying alternating foot lift.', setup: 'Lie with knees bent, feet flat, and abdomen gently braced.', execution: 'Lift one foot a few inches, replace it quietly, and alternate.', formCheck: 'Keep hips still and breathe throughout.', target: 'Foundational core control.' })
        ]
      },
      {
        id: 'home-wednesday-plank', title: 'Plank Stability', muscleGroup: 'Core + Shoulders', setCount: 3, repRange: '20-40 sec', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Plank Shoulder Tap', description: 'A high plank with alternating hand taps to the opposite shoulder.', setup: 'Set hands under shoulders and feet wider than hips.', execution: 'Lift one hand to the opposite shoulder without rotating, then alternate.', formCheck: 'Keep hips square and shift weight as little as possible.', target: 'Core, shoulders, and anti-rotation strength.' }),
          homeOption({ kind: 'backup', name: 'High Plank Hold', description: 'A straight-arm plank held from hands and toes.', setup: 'Set hands under shoulders and extend into a strong straight line.', execution: 'Push the floor away and hold while taking slow breaths.', formCheck: 'Keep hips between shoulder and heel height.', target: 'Core and shoulder endurance.' }),
          homeOption({ kind: 'fallback', name: 'Kneeling Plank Hold', description: 'A straight-arm plank supported by hands and knees.', setup: 'Place knees behind hips and hands under shoulders.', execution: 'Brace from knees through shoulders and hold while breathing.', formCheck: 'Keep hips forward instead of sitting back.', target: 'Core and shoulders with reduced resistance.' })
        ]
      },
      {
        id: 'home-wednesday-climber', title: 'Mountain Climber', muscleGroup: 'Conditioning', setCount: 3, repRange: '20-40 sec', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Mountain Climber', description: 'A high plank with alternating knees driven toward the chest.', setup: 'Set a strong high plank with hands under shoulders.', execution: 'Alternate knee drives at a pace that preserves your plank.', formCheck: 'Keep shoulders over hands and avoid bouncing your hips.', target: 'Cardio, core, hip flexors, and shoulders.' }),
          homeOption({ kind: 'backup', name: 'Slow Cross-Body Climber', description: 'A controlled plank bringing each knee toward the opposite elbow.', setup: 'Take a wide-foot high plank for stability.', execution: 'Draw one knee across, replace it, and switch without rushing.', formCheck: 'Rotate only as much as you can control.', target: 'Core and shoulders with moderate conditioning.' }),
          homeOption({ kind: 'fallback', name: 'Standing Knee Drive', description: 'A standing alternating knee lift with active arm swing.', setup: 'Stand tall with enough room to swing your arms.', execution: 'Drive one knee upward as the opposite arm comes forward, then switch.', formCheck: 'Land softly and keep your torso tall.', target: 'Low-impact cardio and hip flexors.' })
        ]
      },
      {
        id: 'home-wednesday-squat-thrust', title: 'Squat Thrust', muscleGroup: 'Full Body Cardio', setCount: 3, repRange: '6-12', restSeconds: 90,
        options: [
          homeOption({ kind: 'primary', name: 'Squat Thrust', description: 'A no-jump burpee that moves from standing to plank and back.', setup: 'Stand with feet about shoulder width and clear the floor behind you.', execution: 'Squat, place hands down, step or hop to plank, return feet, and stand.', formCheck: 'Brace before the plank and land with feet flat.', target: 'Full-body conditioning.' }),
          homeOption({ kind: 'backup', name: 'Step-Back Squat Thrust', description: 'A no-impact squat thrust stepping one foot at a time.', setup: 'Stand near the front of your clear workout space.', execution: 'Place hands down, step to plank, step forward, and stand tall.', formCheck: 'Move deliberately and keep hands planted during the steps.', target: 'Full-body conditioning with low impact.' }),
          homeOption({ kind: 'fallback', name: 'Chair Walkout', description: 'A standing walkout to a sturdy chair or counter and back.', setup: 'Face a stable surface that will not move.', execution: 'Place hands down, step feet back to an incline plank, step in, and stand.', formCheck: 'Keep the surface stable and your trunk braced.', target: 'Low-impact full-body conditioning.' })
        ]
      }
    ]
  },
  {
    id: 'thursday',
    label: 'Thu',
    title: 'Posterior Chain + Back',
    focus: 'Glutes, hamstrings, back, and shoulder-blade strength',
    warmup: '5 minutes: marching, hip hinges, shoulder rolls, bird dogs, and gentle chest opening.',
    finisher: 'Perform 2 relaxed rounds of 8 bird dogs per side and 30 seconds of wall posture breathing.',
    muscleNotes: [
      'Home pulling is limited without equipment, so use slow, deliberate back contractions.',
      'Make the target muscles move the arms instead of rushing through the range.',
      'Keep your lower back long during all face-down work.'
    ],
    exercises: [
      {
        id: 'home-thursday-pulldown', title: 'Prone Lat Pull', muscleGroup: 'Back', setCount: 3, repRange: '10-15', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Prone Lat Pull-Down', description: 'A face-down arm pull from overhead into a bent-elbow goalpost.', setup: 'Lie face down with arms overhead and thumbs pointing up.', execution: 'Lift arms slightly, pull elbows toward your ribs, then reach long again.', formCheck: 'Keep shoulders away from ears and use a small clean lift.', target: 'Lats, mid-back, and rear shoulders.' }),
          homeOption({ kind: 'backup', name: 'Prone Elbow Drive', description: 'A face-down isometric pull with elbows driving toward the hips.', setup: 'Lie face down with elbows bent beside your shoulders.', execution: 'Pull elbows toward your back pockets, hold two seconds, and release.', formCheck: 'Keep your neck neutral and abdomen gently braced.', target: 'Lats and mid-back.' }),
          homeOption({ kind: 'fallback', name: 'Standing Lat Squeeze', description: 'A standing no-load pull-down with hard back contraction.', setup: 'Stand tall with arms overhead and palms forward.', execution: 'Pull elbows down beside your ribs, squeeze, and reach overhead again.', formCheck: 'Avoid leaning back or shrugging.', target: 'Lat activation and shoulder control.' })
        ]
      },
      {
        id: 'home-thursday-snow-angel', title: 'Reverse Snow Angel', muscleGroup: 'Upper Back', setCount: 3, repRange: '8-15', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Prone Reverse Snow Angel', description: 'A face-down wide arm sweep from hips to overhead.', setup: 'Lie face down with palms facing the floor and forehead relaxed.', execution: 'Float arms slightly and sweep them from hips toward overhead and back.', formCheck: 'Keep the motion smooth and shoulders away from ears.', target: 'Upper back, rear shoulders, and shoulder mobility.' }),
          homeOption({ kind: 'backup', name: 'Prone T Sweep', description: 'A shorter face-down arm sweep through a T position.', setup: 'Lie face down with arms beside your body.', execution: 'Sweep arms outward to a T, pause, and return.', formCheck: 'Use a small lift and avoid lower-back arching.', target: 'Rear shoulders and mid-back.' }),
          homeOption({ kind: 'fallback', name: 'Wall Angel', description: 'A standing arm sweep against a wall.', setup: 'Stand with your back near a wall and elbows bent comfortably.', execution: 'Slide arms upward and return while keeping ribs controlled.', formCheck: 'Do not force wrists or elbows flat if shoulders are tight.', target: 'Upper-back control and shoulder mobility.' })
        ]
      },
      {
        id: 'home-thursday-hinge', title: 'Single-Leg Hip Hinge', muscleGroup: 'Hamstrings + Glutes', setCount: 3, repRange: '8-12 / side', restSeconds: 90,
        options: [
          homeOption({ kind: 'primary', name: 'Single-Leg Romanian Deadlift', description: 'A one-leg bodyweight hinge with the other leg reaching behind.', setup: 'Stand on one leg with a soft knee and hips square.', execution: 'Reach your free leg back as your torso tips forward, then squeeze the standing glute to rise.', formCheck: 'Keep your back long and pelvis facing the floor.', target: 'Hamstrings, glutes, and balance.' }),
          homeOption({ kind: 'backup', name: 'Kickstand Hip Hinge', description: 'A hip hinge with one foot lightly behind as a kickstand.', setup: 'Place most weight on the front foot and rest the back toes behind you.', execution: 'Push hips back over the front heel, then stand by squeezing the front glute.', formCheck: 'Keep the front foot planted and spine neutral.', target: 'Hamstrings and glutes with extra stability.' }),
          homeOption({ kind: 'fallback', name: 'Two-Leg Hip Hinge', description: 'A standing bodyweight hinge using both legs.', setup: 'Stand hip width with knees soft and hands across your chest.', execution: 'Push hips back until hamstrings tighten, then drive hips forward to stand.', formCheck: 'Keep shins mostly vertical and back long.', target: 'Hamstrings, glutes, and hinge technique.' })
        ]
      },
      {
        id: 'home-thursday-bird-dog', title: 'Bird Dog', muscleGroup: 'Back + Core', setCount: 3, repRange: '8-12 / side', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Bird Dog with Pause', description: 'A hands-and-knees opposite arm and leg reach.', setup: 'Set hands under shoulders and knees under hips.', execution: 'Reach opposite arm and leg long, pause two seconds, return, and alternate.', formCheck: 'Keep hips and ribs square to the floor.', target: 'Back extensors, glutes, shoulders, and core.' }),
          homeOption({ kind: 'backup', name: 'Leg-Only Bird Dog', description: 'A hands-and-knees alternating leg reach.', setup: 'Take a stable all-fours position and brace gently.', execution: 'Slide and lift one leg behind you, return, and switch.', formCheck: 'Do not rotate your hips or arch your back.', target: 'Glutes, back, and core stability.' }),
          homeOption({ kind: 'fallback', name: 'Arm-Only Bird Dog', description: 'A hands-and-knees alternating arm reach.', setup: 'Take an all-fours position with hips above knees.', execution: 'Reach one arm forward, replace it, and switch sides.', formCheck: 'Keep your weight centered and neck relaxed.', target: 'Shoulders, upper back, and core stability.' })
        ]
      }
    ]
  },
  {
    id: 'friday',
    label: 'Fri',
    title: 'Full-Body Practice',
    focus: 'Repeat the week’s patterns with smooth, moderate effort',
    warmup: '5 minutes: easy marching, arm circles, hip hinges, alternating lunges, and wall push-ups.',
    finisher: 'Choose a favorite low-impact movement and alternate 40 seconds work with 20 seconds easy movement for 6 rounds.',
    muscleNotes: [
      'Move through this session at a steady pace without racing the clock.',
      'Use the variation you can repeat with the same technique on every set.',
      'Finish with energy left so the weekend supports recovery.'
    ],
    exercises: [
      {
        id: 'home-friday-squat', title: 'Squat Pattern', muscleGroup: 'Legs', setCount: 3, repRange: '12-20', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Squat to Calf Raise', description: 'A bodyweight squat followed by a controlled heel raise.', setup: 'Stand shoulder width with enough overhead clearance.', execution: 'Squat, stand fully, rise onto your toes, and lower before the next rep.', formCheck: 'Finish the squat before starting the calf raise.', target: 'Quads, glutes, and calves.' }),
          homeOption({ kind: 'backup', name: 'Bodyweight Squat', description: 'A smooth two-leg squat with natural arm movement.', setup: 'Stand at a comfortable width with toes slightly turned out.', execution: 'Sit down between your hips and press the floor away to stand.', formCheck: 'Keep feet planted and knees following toes.', target: 'Quads and glutes.' }),
          homeOption({ kind: 'fallback', name: 'Chair Sit-to-Stand', description: 'A controlled stand from and return to a sturdy chair.', setup: 'Use a chair against a wall and place feet firmly under your knees.', execution: 'Lean forward slightly, stand tall, then sit back slowly.', formCheck: 'Control the descent and avoid dropping onto the chair.', target: 'Quads and glutes with a clear range.' })
        ]
      },
      {
        id: 'home-friday-walkout', title: 'Walkout Press', muscleGroup: 'Upper Body + Core', setCount: 3, repRange: '6-10', restSeconds: 90,
        options: [
          homeOption({ kind: 'primary', name: 'Walkout Push-Up', description: 'A standing hand walk to plank, one push-up, and return.', setup: 'Stand at the front of a clear floor space with knees softly bent.', execution: 'Fold down, walk hands to plank, perform a push-up, walk back, and stand.', formCheck: 'Brace before the push-up and take small controlled hand steps.', target: 'Chest, shoulders, triceps, and core.' }),
          homeOption({ kind: 'backup', name: 'Walkout to Plank', description: 'A standing hand walk to high plank and back without a push-up.', setup: 'Stand tall with space to place hands and extend into plank.', execution: 'Walk hands out, hold a strong plank briefly, walk back, and stand.', formCheck: 'Keep hips controlled during the plank.', target: 'Shoulders, core, and hamstring mobility.' }),
          homeOption({ kind: 'fallback', name: 'Wall Walkout Press', description: 'A standing wall press followed by a step back and reset.', setup: 'Face a wall with hands at chest height.', execution: 'Step back, perform a wall push-up, step in, and stand tall.', formCheck: 'Keep the movement smooth and wall contact secure.', target: 'Chest, triceps, and low-impact conditioning.' })
        ]
      },
      {
        id: 'home-friday-lunge', title: 'Lunge + Knee Drive', muscleGroup: 'Legs + Balance', setCount: 3, repRange: '8-12 / side', restSeconds: 90,
        options: [
          homeOption({ kind: 'primary', name: 'Reverse Lunge to Knee Drive', description: 'A reverse lunge that finishes with the rear knee driving forward.', setup: 'Stand tall and focus your eyes on a fixed point.', execution: 'Step back into a lunge, drive through the front foot, and bring the rear knee forward.', formCheck: 'Own the standing balance before beginning the next rep.', target: 'Quads, glutes, hips, and balance.' }),
          homeOption({ kind: 'backup', name: 'Alternating Reverse Lunge', description: 'A reverse lunge alternating sides without the knee drive.', setup: 'Stand with feet under hips and trunk braced.', execution: 'Step back, lower under control, return to standing, and switch.', formCheck: 'Keep the front heel down and torso tall.', target: 'Quads and glutes.' }),
          homeOption({ kind: 'fallback', name: 'Supported Step-Back', description: 'A shallow reverse step while holding a wall or counter.', setup: 'Stand beside stable support with feet under hips.', execution: 'Step one foot back, bend both knees slightly, return, and switch.', formCheck: 'Use your hand for balance and keep the front foot planted.', target: 'Legs and balance with an accessible range.' })
        ]
      },
      {
        id: 'home-friday-bear-plank', title: 'Bear Plank', muscleGroup: 'Core + Shoulders', setCount: 3, repRange: '20-40 sec', restSeconds: 60,
        options: [
          homeOption({ kind: 'primary', name: 'Bear Plank Shoulder Tap', description: 'A hovering hands-and-knees position with alternating shoulder taps.', setup: 'Set hands under shoulders, knees under hips, and hover knees one inch.', execution: 'Tap one hand to the opposite shoulder, replace it, and alternate slowly.', formCheck: 'Keep hips low and square while your knees hover.', target: 'Core, shoulders, and quads.' }),
          homeOption({ kind: 'backup', name: 'Bear Plank Hold', description: 'A hands-and-feet hover with knees just off the floor.', setup: 'Start on all fours, tuck toes, and brace your abdomen.', execution: 'Lift knees slightly and hold while breathing behind the brace.', formCheck: 'Keep back flat and knees close to the floor.', target: 'Core, shoulders, and quads.' }),
          homeOption({ kind: 'fallback', name: 'Quadruped Brace', description: 'A stable all-fours position with strong floor pressure.', setup: 'Set hands under shoulders and knees under hips.', execution: 'Press hands and knees into the floor, brace for five breaths, relax, and repeat.', formCheck: 'Keep spine neutral and shoulders away from ears.', target: 'Foundational core and shoulder stability.' })
        ]
      }
    ]
  }
]
