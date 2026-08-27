---
unlisted: true
sidebar_position: 6
description: "The audit log in Fleet Management: the fleet and tenant trails, what each entry records, filtering and export, and where actions are recorded that do not appear here."
---

# Audit log

Actions are recorded in an **append-only** log: entries are added, never changed or removed, and the trail cannot be edited from the application. Times are shown in **UTC** throughout, so entries from different sites compare directly.

<Figure
  src={require('../img/fleet-audit-log.png').default}
  alt="The audit log filtered to mission events, each row showing a UTC timestamp, category, action, the actor, an outcome of accepted or rejected, and a plain-language description, with CSV and JSON export controls"
  size="full"
  framed
  caption="The audit trail: who did what, when, and whether it was accepted or refused." />

## Two trails

The log is split in two, and they answer different questions.

| Trail | Records |
| --- | --- |
| **Fleet audit** | Operational events from your robots — safety such as emergency stops, control leases, missions, commands and faults, each with its actor and outcome |
| **Tenant audit** | What Weston Robot staff did on your tenant from outside — entering and leaving under an elevation, and each action performed while elevated |

The second is worth understanding rather than skipping. When our staff need access to your tenant to support you, that access is itself recorded: when it began, when it ended, and everything done in between. It is there so you can check it.

## What an entry records

Every entry carries the action taken, who took it, when, and **whether it was accepted or rejected**. Refusals are recorded alongside successes, which is what lets the trail answer "was this attempted?" and not only "was this done?" — a rejected emergency stop or a refused mission activation is often the more interesting row.

Each also carries a plain-language description, so a row reads as a sentence rather than as an identifier.

| Category | Covers |
| --- | --- |
| **Command** | Commands sent to a robot |
| **Mission** | Creating, editing, deleting, activating, deactivating and running missions |
| **Authorization** | Who was granted or refused access to what |
| **Safety** | Safety-related actions, such as emergency stops |
| **Lifecycle** | Robots and sites entering and leaving service |
| **Fault** | Faults raised against a robot |

**Not every entry has a person behind it.** An entry with no operator is attributed to the **robot**, because that is what it is — the robot reporting on itself, or a mission that fired on its own schedule with nobody involved. That is a different thing from an action whose actor could not be identified, and the log distinguishes them.

## Finding and keeping entries

Entries filter by category, by outcome — including a failures-only view — by actor, by date range, and by free-text search. Any result can be exported as **CSV or JSON** for review outside the application, which is the route to take when an auditor wants the record in their own tooling rather than a screen to look at.

**Who can read it** is a role question. Auditors read both trails across every site without being able to command anything, which is what makes the role useful for a reviewer who should not be able to move a robot. See [Roles](/solution/fleet-management/tenant-management#roles).

## Where other actions are recorded

Some cloud-side actions — activating a navigation map among them — are recorded in the platform security trail rather than in this log. If you are looking for one of those and cannot find it here, that is why, and your platform administrator can retrieve it.

## Common questions

**Why is an action I know was attempted missing?**  
Check the category and date filters first, and whether you are on the fleet or tenant trail — the two hold different kinds of entry. Cloud-side actions such as activating a map are in the platform security trail rather than here. If an entry still appears to be missing, raise it: a gap in an append-only trail is worth investigating.

**An entry has no user against it**  
It was the robot acting on its own — reporting on itself, or running a mission that fired on schedule. That is recorded as the robot rather than as an unidentified person.

**Can an entry be corrected or removed?**  
No. The trail is append-only and cannot be edited from the application. A correction is a new entry, not a change to an old one.

**Who can see the audit log?**  
Auditors and tenant administrators. The Auditor role exists precisely so that a reviewer can read everything without being able to change anything.
