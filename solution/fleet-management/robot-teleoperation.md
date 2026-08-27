---
unlisted: true
sidebar_position: 2
description: "Driving a robot from the browser: keyboard and gamepad control, key mapping and axis inversion, speed and deadzone, arranging the camera views, and audio."
---

# Robot teleoperation

Teleoperation is driving a robot yourself, from the browser, when a mission is not the right tool — recovering a robot that has stopped somewhere awkward, positioning it precisely, or looking at something the cameras cannot reach on their own.

Control is held under a **lease**, so only one person drives at a time. Taking and releasing it is covered on the [Robot dashboard](/solution/fleet-management/robot-dashboard#taking-control) page, along with the rest of the control panel.

<Figure
  src={require('../img/fleet-teleop.jpg').default}
  alt="An assisted teleoperation view on a robot configured for it, showing a stitched forward surround view with proximity zones overlaid, three additional camera feeds along the top, a bird's-eye radar panel, speed readouts, link latency and bandwidth, and an emergency stop control"
  size="full"
  framed
  caption="A teleoperation session: camera views, the robot's speed, and the link quality an operator needs to judge it." />

## Driving

Two input methods work at once — whichever you touch is the one giving commands.

**Keyboard.** `W` and `S` drive forward and back, `A` and `D` turn, and `Q` and `E` strafe sideways on robots that can. Commands are sent 15 times a second while a key is held, and the robot is sent a stop the moment you release. Keyboard driving can be switched off entirely if you would rather it were not live in a browser tab.

**Gamepad.** Any controller the browser reports as a standard gamepad works. The default mapping is:

| Input | Default binding |
| --- | --- |
| Forward and back | Left stick, vertical |
| Turn | Right stick, horizontal |
| Strafe | Left stick, horizontal |
| Emergency stop | **LB** |
| Push-to-talk | **RB** |

Each axis can be reassigned and **inverted independently**, which is what makes a controller that pushes the wrong way usable without relearning it. The two buttons can be reassigned or set to none.

## Speed and sensitivity

| Setting | Default | What it does |
| --- | --- | --- |
| **Linear speed** | 0.5 m/s | Full-stick forward and back |
| **Angular speed** | 1.0 rad/s | Full-stick turn |
| **Lateral speed** | 0.5 m/s | Full-stick strafe |
| **Deadzone** | 0.1 | How far a stick must move before it counts, so a resting stick does not creep |

These are the values a full deflection asks for, so lowering them makes the whole range gentler rather than capping the top — the right move for a robot working close to people or shelving.

**Settings apply globally, and can be overridden per robot.** Editing while a robot is open changes that robot's override; the global value is shown beside it so you can see what you have departed from, and **Reset to global** puts it back. A heavy outdoor machine and a small indoor one can therefore sit at different speeds without either being wrong.

## Arranging the view

What you see while driving is yours to arrange, and the arrangement is remembered per robot.

| Setting | Options |
| --- | --- |
| **Layout** | 17 templates from one to six panes — Full Screen, Side by Side, Stacked, Focus Left, 2×2 Grid, Focus Top + 3 and so on |
| **Slots** | Which camera goes in which pane of the chosen layout |
| **Primary view** | The camera that takes the main pane |
| **Picture-in-picture** | Any stream can be pinned to a corner — top or bottom, left, centre or right — or switched off |
| **Fit** | Fill the pane, or lock each view to 16:9 so nothing is cropped |
| **Visible in teleop** | Which cameras appear while driving, which can be a smaller set than the dashboard shows |

The **focus / fit** choice is the one worth deliberate thought: filling the pane uses every pixel but crops, and locking the aspect keeps the whole frame at the cost of letterboxing. For judging clearance beside a robot, seeing the whole frame usually matters more than filling the screen.

Layout preferences are restored when you return to a robot. Which camera streams are running is not — streams are started fresh each session, so a view opens empty until its feeds connect.

## Audio

Audio is **push-to-talk** by default: hold the bound button to speak, release to stop. It can be set to always-on where an operator needs both hands. Incoming volume is adjustable separately.

Push-to-talk is worth keeping as the default in a shared control room, since always-on carries whatever else is being said in the room to whoever is near the robot.

## The assisted view

Some robots present an **assisted** driving view: camera feeds stitched into a surround view, proximity zones drawn from the robot's own sensing, and a bird's-eye radar panel, alongside speed, link latency and bandwidth.

**It is tuned for a particular robot configuration and deployment**, and is not part of every robot's teleoperation by default — what a given robot shows depends on the sensors it carries and how it was set up. Confirm which of your robots have it before planning work that relies on it.

## Common questions

**The robot stopped on its own while I was driving**  
Teleoperation stops the robot when the connection to the fleet degrades. That is deliberate — driving a machine you can no longer see is worse than halting it.

**My controller drives the wrong way**  
Invert the axis rather than remapping it. Each of the three axes has its own invert, and the defaults suit a common controller layout rather than every one.

**I changed a speed and it only applied to one robot**  
Expected. Editing with a robot open sets that robot's override; the global value is shown beside it, and Reset to global clears the override.

**The view opened with no cameras**  
Streams start fresh each session rather than being restored, so the panes fill as the feeds connect. The layout itself is remembered.

**Can two people drive at once?**  
No. Control is held under a lease, and only one person holds it at a time.
