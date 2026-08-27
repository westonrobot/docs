---
unlisted: true
sidebar_position: 3
description: "Detection review in Fleet Management: what the robots found, which event types raise an alert, how records are kept, and what alerting does not do."
---

# Detection review

Everything the robots detected lands here and stays here — filterable, reviewable, and kept as a record that cannot be edited or deleted.

Whatever did the detecting reports into the same place. A camera on the robot and an analytics service running elsewhere both produce events of the same shape, so this page is the single record regardless of what found the thing.

## Reviewing what was found

<Figure
  src={require('../img/fleet-detection-review.jpg').default}
  alt="Detection Review in gallery view, showing intrusion and perimeter-compromised detections as images with bounding boxes, each labelled with priority, camera, robot, time and who acknowledged it, beside a summary counting detections by priority and type"
  size="lg"
  framed
  caption="Detection Review: what was seen, when, by which robot, and who has signed it off." />

Detections filter by robot, type, priority and review state, and each one is **acknowledged by a named person**. The record holds the image the detection was made from, and it is stored so it cannot be edited or deleted afterwards; reviewer notes are appended rather than replacing what was there. That makes the list an evidence trail rather than a working queue — you can show it to someone later and it will say the same thing.

## Which events raise an alert

Every event type carries a priority, and **an alert is raised at high priority and above.** That is 12 of the 25 event types, two of which are critical: fire or smoke, and a person down. Events below that threshold are recorded and reviewable, but raise no alert.

If you expect to be alerted about something, check the priority of its type rather than assuming every detection alerts.

An event type the platform does not recognise is treated as lowest priority and shown as **Unclassified detection**, so an unexpected event from an integration can never raise an alert by surprise.

## What alerting does not do

**Alerts stay in the app.** There is no email, SMS, push notification or phone call, so an alert is only seen by someone with the dashboard open in front of them. That makes alerting a staffing question as much as a configuration one — plan for who is watching, not just for what is detected.

Which event types raise an alert is fixed, and cannot be varied per site.

## What the record does and does not contain

**Video is live only.** Camera feeds are not recorded, so what remains after the fact is the detection record and its still image — never footage of the moment. Plan around that if an incident review at your site is expected to produce a clip.

**A detection is pinned to the robot, not to what it saw.** The record marks where the robot was standing, with no distance to the subject. For a detection at the far end of a corridor, the position in the record is the robot's, not the subject's.

## Common questions

### Something was detected but nobody was alerted

Check the priority of that event type. Alerts are raised at high priority and above; anything below is recorded without alerting anyone. Remember too that alerts appear only in the app, so someone has to have it open.

### What is an "Unclassified detection"?

An event of a type the platform does not recognise. It is recorded at lowest priority so that an unexpected event from an integration cannot raise an alert by surprise.

### Can I get the video of a detection?

No. Camera feeds are live and are not recorded. The still image kept with the detection is what survives.

### Can a detection be corrected or removed?

No. Records are stored so they cannot be edited or deleted, and reviewer notes are appended rather than overwriting what was there.

## Support

Before raising a ticket, note which site and robot are involved, the time of the detection, and its type and priority. [Before you contact us](/support/before-you-contact-us) lists what helps.

[Submit a support request](https://forms.office.com/r/qELKzYF33W).
