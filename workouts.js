const EXERCISES = {
  warmup: [
    {
      name: "Jumping Jacks",
      time: 20,
      level: "beginner",
      img: "images/jumping_jacks.png",
      video: "https://musclewiki.com/exercises/male/full-body/jumping-jacks"
    },
    {
      name: "Arm Circles",
      time: 20,
      level: "beginner",
      img: "images/arm_circles.png",
      video: "https://www.youtube.com/watch?v=140RTNMciH8"
    },
    {
      name: "March in Place",
      time: 20,
      level: "beginner",
      img: "images/march_in_place.png",
      video: "https://www.youtube.com/watch?v=l7rce6IQDWs"
    },
    {
      name: "Torso Twists",
      time: 20,
      level: "beginner",
      img: "images/torso_twists.png",
      video: "https://www.youtube.com/watch?v=wkD8rjkodUI"
    }
  ],

  push: [
    {
      name: "Wall Pushups",
      reps: 8,
      level: "beginner",
      img: "images/wall_pushups.png",
      video: "https://www.youtube.com/watch?v=0GsVJsS6474"
    },
    {
      name: "Knee Pushups",
      reps: 10,
      level: "beginner",
      img: "images/knee_pushups.png",
      video: "https://www.youtube.com/watch?v=jWxvty2KROs"
    },
    {
      name: "Pushups",
      reps: 10,
      level: "beginner",
      img: "images/pushups.png",
      video: "https://www.youtube.com/watch?v=IODxDxX7oi4"
    },
    {
      name: "Incline Pushups",
      reps: 12,
      level: "beginner",
      img: "images/incline_pushup.png",
      video: "https://www.youtube.com/watch?v=cfns6h1c5os"
    },

    {
      name: "Decline Pushups",
      reps: 12,
      level: "medium",
      img: "images/decline_pushup.png",
      video: "https://www.youtube.com/watch?v=SKPab2YC8iI"
    },
    {
      name: "Diamond Pushups",
      reps: 10,
      level: "medium",
      img: "images/diamond_pushups.png",
      video: "https://www.youtube.com/watch?v=J0DnG1_S92I"
    },
    {
      name: "Wide Arm Pushups",
      reps: 12,
      level: "medium",
      img: "images/wide_pushups.png",
      video: "https://www.youtube.com/watch?v=IODxDxX7oi4"
    },

    {
      name: "Archer Pushups",
      reps: 8,
      level: "hard",
      img: "images/archer_pushups.png",
      video: "https://www.youtube.com/watch?v=F2RrGd7X3eQ"
    },
    {
      name: "Pseudo Planche Pushups",
      reps: 6,
      level: "hard",
      img: "images/pseudo_planche_pushups.png",
      video: "https://www.youtube.com/watch?v=7xqJ1RzZPzY"
    }
  ],

  legs: [
    {
      name: "Squats",
      reps: 12,
      level: "beginner",
      img: "images/squats.png",
      video: "https://www.youtube.com/watch?v=aclHkVaku9U"
    },
    {
      name: "Lunges",
      reps: 10,
      level: "beginner",
      img: "images/lunges.png",
      video: "https://www.youtube.com/watch?v=QOVaHwm-Q6U"
    },
    {
      name: "Step Back Lunges",
      reps: 10,
      level: "beginner",
      img: "images/step_back_lunges.png",
      video: "https://www.youtube.com/watch?v=wrwwXE_x-pQ"
    },

    {
      name: "Jump Squats",
      reps: 10,
      level: "medium",
      img: "images/jump_squats.png",
      video: "https://www.youtube.com/watch?v=Azl5tkCzDcc"
    },
    {
      name: "Bulgarian Split Squats",
      reps: 8,
      level: "medium",
      img: "images/bulgarian_split_squats.png",
      video: "https://www.youtube.com/watch?v=2C-uNgKwPLE"
    },
    {
      name: "Wall Sit",
      time: 30,
      level: "medium",
      img: "images/wall_sit.png",
      video: "https://www.youtube.com/watch?v=y-wV4Venusw"
    },
    {
      name: "Vertical Leap",
      rep: 15,
      level: "medium",
      img: "images/vertical_leap.png",
      video: "https://www.youtube.com/watch?v=j260zYfRz8Q"
    },
    {
      name: "Pistol Squats",
      reps: 5,
      level: "hard",
      img: "images/pistol_squats.png",
      video: "https://www.youtube.com/watch?v=vq5-vdgJc0I"
    },
    {
      name: "Explosive Lunges",
      reps: 8,
      level: "hard",
      img: "images/explosive_lunges.png",
      video: "https://www.youtube.com/watch?v=1h9q3cZ6W6U"
    }
  ],

  core: [
    {
      name: "Plank",
      time: 20,
      level: "beginner",
      img: "images/plank.png",
      video: "https://www.youtube.com/watch?v=pSHjTRCQxIw"
    },
    {
      name: "Dead Bug",
      reps: 10,
      level: "beginner",
      img: "images/dead_bug.png",
      video: "https://www.youtube.com/watch?v=4XLEnwUr4w8"
    },
    {
      name: "Mountain Climbers",
      time: 20,
      level: "beginner",
      img: "images/mountain.png",
      video: "https://www.youtube.com/watch?v=nmwgirgXLYM"
    },

    {
      name: "Leg Raises",
      reps: 12,
      level: "medium",
      img: "images/leg_raises.png",
      video: "https://www.youtube.com/watch?v=l4kQd9eWclE"
    },
    {
      name: "Russian Twists",
      reps: 16,
      level: "medium",
      img: "images/russian_twists.png",
      video: "https://www.youtube.com/watch?v=wkD8rjkodUI"
    },
    {
      name: "Bicycle Crunches",
      reps: 16,
      level: "medium",
      img: "images/bicycle_crunches.png",
      video: "https://www.youtube.com/watch?v=9FGilxCbdz8"
    },

    {
      name: "Hollow Hold",
      time: 20,
      level: "hard",
      img: "images/hollow_hold.png",
      video: "https://www.youtube.com/watch?v=LlDNef_Ztsc"
    },
    {
      name: "V-Ups",
      reps: 12,
      level: "hard",
      img: "images/v_ups.png",
      video: "https://www.youtube.com/watch?v=iP2fjvG0g3w"
    }
  ],

  hiit: [
    {
      name: "Burpees",
      time: 15,
      level: "beginner",
      img: "images/burpees.png",
      video: "https://www.youtube.com/watch?v=TU8QYVW0gDU"
    },
    {
      name: "High Knees",
      time: 20,
      level: "beginner",
      img: "images/high_knees.png",
      video: "https://www.youtube.com/watch?v=OAJ_J3EZkdY"
    },
    {
      name: "Jump Rope (imaginary)",
      time: 30,
      level: "beginner",
      img: "images/jump_rope.png",
      video: "https://www.youtube.com/watch?v=1BZM0S4A9u0"
    },

    {
      name: "Skater Jumps",
      time: 20,
      level: "medium",
      img: "images/skater_jumps.png",
      video: "https://www.youtube.com/watch?v=1BZM0S4A9u0"
    },
    {
      name: "Tuck Jumps",
      time: 15,
      level: "medium",
      img: "images/tuck_jumps.png",
      video: "https://www.youtube.com/watch?v=U4s4mEQ5VqU"
    },

    {
      name: "Sprint in Place",
      time: 20,
      level: "hard",
      img: "images/sprint_in_place.png",
      video: "https://www.youtube.com/watch?v=OAJ_J3EZkdY"
    },
    {
      name: "Burpee Pushups",
      time: 20,
      level: "hard",
      img: "images/burpee_pushups.png",
      video: "https://www.youtube.com/watch?v=TU8QYVW0gDU"
    }
  ],

  stretch: [
    {
      name: "Hamstring Stretch",
      time: 20,
      level: "beginner",
      img: "images/hamstring.png",
      video: "https://www.youtube.com/watch?v=vPKuZr9Nw0M"
    },
    {
      name: "Quad Stretch",
      time: 20,
      level: "beginner",
      img: "images/quad_stretch.png",
      video: "https://www.youtube.com/watch?v=K1V6e0W8K6I"
    },
    {
      name: "Shoulder Stretch",
      time: 20,
      level: "beginner",
      img: "images/shoulder_stretch.png",
      video: "https://www.youtube.com/watch?v=Fcd2q2NZU3E"
    },
    {
      name: "Child Pose",
      time: 30,
      level: "beginner",
      img: "images/child_pose.png",
      video: "https://www.youtube.com/watch?v=eqVMAPM00DM"
    }
  ]
};