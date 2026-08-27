---
unlisted: true
sidebar_position: 3
description: "Detection review in Fleet Management: filtering and acknowledging detections, the 25 event types and the priority each carries, and what every record keeps."
---

# Detection review

Detections from every robot land here and stay here. Whatever did the detecting reports into the same place — a camera on the robot, or an analytics service running elsewhere — so this is the single record regardless of what found the thing.

## Working through the list

<Figure
  src={require('../img/fleet-detection-review.jpg').default}
  alt="Detection Review in gallery view, showing intrusion and perimeter-compromised detections as images with bounding boxes, each labelled with priority, camera, robot, time and who acknowledged it, beside a summary counting detections by priority and type"
  size="full"
  framed
  caption="Detection review: what was seen, when, by which robot, and who has signed it off." />

| Filter by | Use it to |
| --- | --- |
| **Robot** | Narrow to one machine when following up on its patrol |
| **Type** | Pull every instance of one event, such as every blocked exit |
| **Priority** | Work the urgent end of the list first |
| **Review state** | Separate what has been acknowledged from what has not |

Acknowledging a detection records **who** signed it off, against their name. Reviewer notes are appended rather than replacing what was there, and the record itself cannot be edited or deleted. That is what makes the list an evidence trail rather than a working queue: it will say the same thing when someone reads it back months later.

## Event types and priority

The platform recognises 25 event types. Each carries a priority, and **priority is what decides whether an alert is raised** — high and above alerts, everything below is recorded and reviewable without alerting.

| Priority | Alerts | Event types |
| --- | --- | --- |
| **Critical** | Yes | Person down · Fire or smoke |
| **High** | Yes | Intrusion · Perimeter compromised · Safety gear missing · Unsafe act · Altercation · Leak detected · Gauge out of range · Thermal anomaly · Equipment state abnormal · Blocked exit |
| **Medium** | No | Boundary crossed · Loitering · Restricted behaviour · Spill detected · Indicator abnormal · Noise threshold exceeded · Defect detected · Asset missing · Asset displaced · Channel occupied |
| **Low** | No | Crowd density |
| **Info** | No | Count report · Identity captured |

Twelve of the 25 alert. When you expect to be told about something, check which row its type sits in rather than assuming every detection alerts.

**Identity captured records personal data**, which is worth knowing before an integration starts emitting it — who may see the list is a role question, covered in [Roles](/solution/fleet-management/tenant-management#roles).

An event type the platform has not been told about is recorded at lowest priority as **Unclassified detection** and appears in the same list, so an integration can introduce new types and they are still captured and reviewable.

## What each record keeps

| The record holds | Notes |
| --- | --- |
| **The still image** the detection was made from | Camera feeds stream live; the still is what an incident review works from afterwards, so plan on stills where your process expects a clip |
| **The robot's position** at the time | Pinned to the robot rather than to what it saw — for a detection at the far end of a corridor, the position recorded is the robot's, not the subject's |
| **Type, priority and time** | As assigned when the event was ingested |
| **Who acknowledged it, and when** | Against a named person |
| **Reviewer notes** | Appended, never overwriting what was there |

## Common questions

### Something was detected but nobody was alerted

Check which priority that event type carries in the table above. High and above alerts; anything below is recorded without alerting anyone. Alerts also appear in the app, so someone needs it open.

### What is an "Unclassified detection"?

An event of a type the platform has not been told about. It is recorded at lowest priority and appears in the same list, so an integration can add event types without changing what alerts.

### Can I get the video of a detection?

Camera feeds are live. The still image kept with the detection is what survives, and it is what a review works from.

### Can a detection be corrected or removed?

Records cannot be edited or deleted. Add a reviewer note instead — notes are appended, so the original and the correction both remain.
