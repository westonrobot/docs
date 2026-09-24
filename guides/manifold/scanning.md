---
sidebar_position: 3
description: "Capture a site with a Manifold Pocket2 Scanner: creating the project, level initialisation, how to walk a site, loop closure, doorways and narrow spaces, and stopping a scan safely."
tags: [manifold, pocket2, scanning]
---

# Pocket2 Scanning Guide

A capture has three parts, and they fail differently. **Initialisation** fails outright if you get it wrong. **Walking the site** forgives a shaky metre but not a badly planned route. **Stopping** is what commits the data, and it is the step people underestimate.

You need MindCloud Go connected to the scanner before any of this — see the [Pocket2 Connection Guide](./connecting.md).

## Creating the project

**Start Scan** on the Home page opens **New Project**.

<Figure
  src={require('./img/mindcloud-go-new-project.jpg').default}
  alt="The MindCloud Go New Project screen with a Project Name field containing the word office and a 6 of 30 character counter, toggles for Enable NTRIP and Panorama Annotation both switched off, and a Start Scan button"
  size="sm"
  framed
  caption="New Project. The two toggles are not things you can turn on later." />

**Give it a name.** The name does not affect the point cloud in any way, but the package the scanner writes is identified by date and time, so `MT20260901-094648` is what you get without one. A name like `office` or a site reference is the difference between finding the right capture in a month and opening four to check.

**Both toggles have to be decided now.** Neither can be turned on once the scan is running:

| Toggle | Turn it on when |
| --- | --- |
| **Enable NTRIP** | The scan needs real-world coordinates and you have an RTK receiver fitted and CORS credentials. Configured from the satellite icon beside it — see [Common configurations](/peripheral/sensor/manifold_pocket2#common-configurations) |
| **Panorama Annotation** | A panoramic camera is fitted and you want panoramas captured in step with the cloud |

Then **Start Scan** again.

## Initialisation

**Put the scanner down on a flat, level surface and leave it alone.**

1. **Flat and level, and not in your hands.** Not held at an angle, not on a noticeable slope, not moving.
2. **Point it at something with structure.** Nothing directly in front of it, nothing moving.
3. **Wait for the point cloud to appear.** While the app shows the blue *"Waiting for device initialization"* banner, Point Count reads 0 and the scanner is still working out its starting reference. When the banner clears and the preview fills with points, initialisation is done — only then pick the scanner up.

<Figure
  src={require('./img/mindcloud-go-scan-initialising.jpg').default}
  alt="The MindCloud Go Scan Job screen during initialisation, showing a blue Waiting for device initialization banner, a telemetry panel reading Scan Duration 00:00:02, Translation 0.0 metres per second, Rotation 0.0 degrees per second, Total Distance 0.0 metres and Point Count 0, with device temperature and free storage in a strip along the top"
  size="sm"
  framed
  caption="Waiting for device initialization. Translation and Rotation read 0.0 because the scanner is sitting still — exactly the condition it needs — and Point Count is still 0. The preview filling with points is what tells you initialisation is done." />

**Why it matters.** The scanner works out its starting position and orientation from what it sees while sitting still. Start it unlevel or moving and it begins from a poor reference, which can show up later as unstable tracking or a map that does not align well. It will not explain every mapping problem, but it is a cheap one to avoid.

If initialisation fails outright, the view is too featureless — a plain white wall being the classic case. Choose a spot with a **wide field of view and decent lighting**, avoid moving objects, glass and water, turn to face something with edges in it, and try again.

## Walking the site

Hold the scanner **vertical to the ground and directly in front of your body**. The point of the posture is a stable sensor, not comfort. It is the posture you walk in rather than a rule against ever changing the angle — see [corners and recesses](#corners-recesses-and-blind-spots) for when to tilt it.

**Walk as though you are carrying a glass of water that is almost overflowing.** Two things to avoid specifically: shaking the unit, and rotating it on the spot.

Do not rush a site. A capture walked quickly is not a faster job; it is the same job plus a return visit.

**Watch the preview, not your feet.** The app draws the cloud as it builds, and you can switch it between true colour, intensity and elevation. That preview is the only chance you get to notice a gap while you are still standing where you could fill it — a wall you passed too fast, a corner you cut, a room you walked through rather than around. Rescan a thin patch immediately; discovering it in MindCloud Studio means going back to site.

Two display controls exist for the phone's benefit rather than the scan's:

- **The preview point limit** (settings icon ▸ display) caps how many points the app draws. Lower it on a slower phone. It affects the preview only — the file the scanner writes is unaffected.
- **EDL and X-Ray rendering** make the preview easier to read: EDL emphasises edges and gives the cloud depth, X-Ray lets you see through structure. Neither changes what is recorded.

### Loop closure, and why it is worth walking for

As you move, the scanner is continuously estimating its own position. Each estimate is slightly wrong, and those errors **add up the further you walk** without returning to ground you have already covered. On a long one-way route that drift ends up in the map — usually as walls that do not quite meet, or a straight corridor that comes out bent.

**Revisiting a mapped area is what lets the software correct it.** When the scanner sees somewhere it has been before, it can recognise the same geometry and use that as a fixed point, spreading the accumulated error back across the whole route instead of leaving it at the far end. All it needs is that your paths intersect or overlap somewhere.

What that means for how you walk a site:

- **Revisit previously scanned areas wherever it is practical.** Walking back through a space you have already covered is not wasted effort.
- **Make several useful loops in a large area**, rather than treating one big circuit as the only option.
- **You do not have to finish where you started.** Returning to your starting point is one easy way to guarantee an overlap, but it is the overlap that does the work, not the spot you end on.
- **Avoid one long open-ended path** if a sensible loop exists.

<figure style={{maxWidth: 420, margin: '1.5rem auto 2rem'}}>
  <svg
    viewBox="0 0 380 470"
    style={{width: '100%', height: 'auto'}}
    role="img"
    aria-label="Two plan views of the same rectangular floor. In the first, a single route sweeps back and forth in three passes and stops at the far end, never crossing itself. In the second, the same floor is covered by three flattened loops stacked one below the other, each loop closing on itself and overlapping the loop above it, worked from the top of the space downwards.">
    <defs>
      <marker id="wr-route-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4a8fd4" />
      </marker>
      <marker id="wr-route-arrow-end" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#9b72cf" />
      </marker>
      <marker id="wr-step-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fillOpacity="0.45" />
      </marker>
    </defs>

    <text x="20" y="18" fontSize="14.5" fontWeight="600" fill="currentColor">One open-ended route</text>
    <rect x="20" y="30" width="340" height="146" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
    <path d="M 50 58 H 330 V 98 H 50 V 152 H 314" fill="none" stroke="#4a8fd4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#wr-route-arrow)" />
    <circle cx="50" cy="58" r="5.5" fill="#4a8fd4" />
    <text x="50" y="50" fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.8">start</text>
    <text x="316" y="170" fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.8">finish</text>
    <text x="190" y="200" fontSize="12.5" textAnchor="middle" fill="currentColor" fillOpacity="0.85">The walk stops at the end of the third pass.</text>
    <text x="190" y="216" fontSize="12.5" textAnchor="middle" fill="currentColor" fillOpacity="0.85">Nothing has been seen twice.</text>

    <text x="20" y="256" fontSize="14.5" fontWeight="600" fill="currentColor">The same floor, walked as stacked loops</text>
    <rect x="20" y="268" width="340" height="146" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />

    <path d="M 346 300 V 372" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" markerEnd="url(#wr-step-arrow)" />

    <rect x="48" y="288" width="284" height="42" rx="14" fill="none" stroke="#4a8fd4" strokeWidth="3" />
    <rect x="48" y="316" width="284" height="42" rx="14" fill="none" stroke="#dd8a33" strokeWidth="3" />
    <path d="M 48 358 A 14 14 0 0 1 62 344 H 318 A 14 14 0 0 1 332 358 V 372 A 14 14 0 0 1 318 386 H 62 A 14 14 0 0 1 48 372" fill="none" stroke="#9b72cf" strokeWidth="3" markerEnd="url(#wr-route-arrow-end)" />

    <text x="33" y="314" fontSize="13" fontWeight="700" textAnchor="middle" fill="#4a8fd4">1</text>
    <text x="33" y="342" fontSize="13" fontWeight="700" textAnchor="middle" fill="#dd8a33">2</text>
    <text x="33" y="370" fontSize="13" fontWeight="700" textAnchor="middle" fill="#9b72cf">3</text>

    <circle cx="120" cy="288" r="5.5" fill="#4a8fd4" />
    <text x="120" y="280" fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.8">start</text>
    <text x="96" y="404" fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.8">finish</text>

    <text x="190" y="438" fontSize="12.5" textAnchor="middle" fill="currentColor" fillOpacity="0.85">Each loop overlaps the one above it, and the walk</text>
    <text x="190" y="454" fontSize="12.5" textAnchor="middle" fill="currentColor" fillOpacity="0.85">ends part-way round the last.</text>
  </svg>
  <figcaption style={{fontSize: '0.85rem', textAlign: 'center', opacity: 0.8, marginTop: '0.5rem'}}>
    Both walks cover the floor. The difference is that this one keeps handing the scanner
    ground it has already seen — which is the only thing Loop Closure has to work with.
  </figcaption>
</figure>

The revisits you walk are what the **Loop Closure** option works from when the capture reaches [MindCloud Studio](./processing.md#loading-it-in-mindcloud-studio). A route that never revisits anything gives it nothing to correct against.

**It is not a repair mechanism.** A closed loop will not rescue a scan walked too fast, through a featureless space, or with large gaps in coverage. Good coverage, controlled motion and usable geometry still decide the result; loop closure improves a decent scan rather than fixing a poor one.

### Narrow spaces: corridors, hallways and stairs

**Walk forward through them.** Do not walk backwards to keep the scanner aimed at ground you have already covered: it costs you stability, which matters more. Keep the pace controlled, keep the turns gentle at each end, and let the space be covered by passing through it.

Stairs are the same instruction with more care taken over the pace.

### Corners, recesses and blind spots

**Tilt the scanner gently to reach them.** A space has geometry above and below the scanner's normal viewing direction — a high recess, the underside of a mezzanine, a corner the body of the unit shadows. A smooth, deliberate tilt brings it into view.

The distinction that matters is **controlled orientation versus uncontrolled motion**:

| Do | Do not |
| --- | --- |
| Tilt or rotate the unit smoothly to bring a corner or recess into view | Swing it, jerk it, or rotate rapidly |
| Keep the movement deliberate — the same glass of water | Rotate on the spot |

### Doorways

**Move sideways through a tight doorway** where it is practical. Carrying the scanner straight through the middle of a narrow opening gives it a poor view of the two walls either side; going through sideways exposes both of them.

Treat this as a field technique rather than a rule — a wide doorway needs nothing special.

### Environments that make this harder

Most of these change how you plan the route, not whether you go. Rain is the exception.

**Rain.** Do not scan in it. Manifold publish no ingress rating for the Pocket2, so nothing states that the unit tolerates water — and rain on the LiDAR and camera windows costs you returns even where the unit itself is fine. Wait for it to stop, or work under cover.

**Repetitive or feature-poor spaces.** A long corridor, a tunnel, a row of identical bays — anywhere with little distinctive geometry gives the scanner fewer cues to tell one place from another, and a highly symmetrical space can look much the same from several positions. These are scannable; they just reward a route with **useful overlap and revisits**, and they punish a single open-ended pass, because there is nothing for the processing to correct accumulated drift against.

**Glass, mirrors, water and highly reflective or transparent surfaces.** A laser needs something to scatter off. These can produce missing returns, noisy returns, an incomplete surface, or geometry that is a reflection of somewhere else. That does not invalidate a scan — most buildings have windows — but it does mean **checking the result rather than assuming the scanner reproduced those surfaces faithfully.** Where a frontage is largely glazed, cover it from more than one angle.

**Busy sites.** Moving people and vehicles put part of the scene in motion, which leaves less of it usable as a stable reference and can leave smears in the cloud. Scan when it is quieter if you have the choice. What is left afterwards is dealt with in [processing](./processing.md#loading-it-in-mindcloud-studio), where the aim is a map that matches the site the robot will work in rather than the emptiest possible cloud.

## How much to do in one scan

There is no published size limit, and no useful general one — it depends on the complexity of the site, the route you walk, storage, the machine that will process it and what the client actually needs.

**The battery is the real constraint, not a size rule.** Up to 2 hours on a full charge is the practical unit a session is planned around, and plenty of sites fit inside one capture. Plan a route that crosses back over itself, and treat one pass as the default.

**Splitting is a last resort, not a tidy-up.** It is the right call for a site that genuinely will not fit, but it buys you a stitching problem, and the seam requirement is strict enough that it has to be planned before you start.

**On a long-running project**, agree the site scale, the accuracy tolerance and the processing hardware with the client first, and pilot the workflow before committing to it.

:::tip If you are going to split a capture, split it deliberately

MindCloud Studio can stitch separate captures together, but only if each one **begins
where the previous one ended**, in the same position and orientation. Decide the seams
before you start and end each segment somewhere you can stand again — a doorway, a mark
on the floor. A seam chosen when the battery warning appears is in the wrong place.

:::


## Stopping is the step that commits the data

<Figure
  src={require('./img/mindcloud-go-scan-map.jpg').default}
  alt="The MindCloud Go Scan Job view part-way through an office capture, showing a colourised point cloud of desks, structural columns and ceiling services, with telemetry reading Scan Duration one minute 35 seconds, Rotation 6.1 degrees per second, Total Distance 9.4 metres and Point Count 4,482,138, and a red stop button at the bottom"
  size="sm"
  framed
  caption="A capture in progress. Watch the preview for gaps while you can still fill them — and note the people at the desks, which is what Moving Object Filtering deals with later." />

1. **Review what you have covered** in the preview before you finish. This is the last moment a gap is cheap — and the last moment a re-walk costs minutes rather than another site visit. Look for the things listed under [Judging a scan before you leave](#judging-a-scan-before-you-leave) below.
2. **Tap the stop icon** in the scanning view.
3. The app reports *"Project is being saved, please wait…"*. **Do not power the scanner off, and do not close or clear the app while it says this.**
4. The scan is complete only when the app reports *"Project saved as xxx"*. **Confirm that before disconnecting or powering down.**

**Try to finish on ground you have already covered** rather than at the far end of something new. It does not have to be your starting point — anywhere your route crosses itself will do.

**Scanning survives the phone; stopping does not.** The capture runs on the scanner, so closing the app, losing the Wi-Fi link or the phone shutting down does not stop it. Rejoin the scanner's Wi-Fi with the same phone — restarting MindCloud Go if you need to — and the app returns to the running session. But the stop is a command sent over that link, which means:

> To end a scan you must reconnect **the same phone that started it** to the scanner's Wi-Fi, and press stop from there.

Offline scanning is a data-protection measure, not a way of working. When a link does drop, **check the preview against the ground you covered while it was down** before you stop, and treat the disconnection as something to recover from rather than a way to operate.

## Judging a scan before you leave

A bad capture is cheapest to catch here, in the preview, while you are still standing in the building. There is a second chance later, on the processed cloud in [MindCloud Studio](./processing.md#look-at-it-before-you-export).

**Signs a scan should be redone rather than accepted:**

| What you see | Why it matters |
| --- | --- |
| The map looks **tilted** — the floor is not level in the view | The scanner takes its reference frame from where it sits at the start, so everything placed on this map inherits the tilt |
| Geometry looks **warped or distorted** — straight walls curved, right angles that are not | Accumulated drift that the processing has not corrected |
| **Doubled walls or doubled geometry** — the same surface appearing twice, slightly apart | Drift across a revisit that did not close |
| **Disconnected or displaced sections** — part of the site floating away from the rest | Tracking was lost and recovered in the wrong place |
| **Major missing coverage** where you walked | A gap that only a return visit can fill |

If any of those are clearly present, **re-scan**. It is cheaper here than anywhere downstream.

:::note Looking right is not the same as being right

The preview catches the failures above. It cannot tell you a clean-looking scan is
accurate — that is settled later, and finally only by
[driving a robot on the map](./processing.md#the-final-check-is-the-robot-not-the-file).

:::

## Looking after the unit

- Do not touch or cover the heat dissipation area during a long session.
- Moving between very hot and very cold environments condenses water on the LiDAR and camera windows. Wipe them before scanning; the scanner cannot tell condensation from a poor return.
- If the unit is going into storage, charge the battery once a month.

---

Capture saved? Continue with the [Point Cloud Processing & Export Guide](./processing.md).
