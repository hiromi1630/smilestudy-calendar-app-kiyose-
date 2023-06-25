<script lang="ts">
  import type { CalendarEvent } from '../../types';
  import Modal from './Modal.svelte';

  import { EventButtonType } from './../../stores/Calendar';
  import { getTextColor, ColorCode } from '../../utils/getTextContrast';

  export let event: CalendarEvent;

  let text = '';
  let className =
    'btn btn-block btn-xs border-0 rounded text-clip text-ellipsis whitespace-nowrap';

  $: modalId = `modal-${event.id}`;

  // bind control
  export let width: number | undefined;

  const createBackgroundColor = () =>
    $EventButtonType === 'Subject'
      ? `#${event.subject.color}`
      : event.teacher.color;

  let backgroundColor = createBackgroundColor();

  let textColor = getTextColor(backgroundColor as ColorCode);

  $: {
    const { teacher, timeStart, timeEnd, classroom, subject } = event;

    backgroundColor = createBackgroundColor();
    textColor = getTextColor(backgroundColor as ColorCode);

    if ($EventButtonType === 'Default') {
      if (!width || width < 130) {
        text = `${teacher.familyName}`;
      } else if (width < 300) {
        text = `${teacher.familyName} - ${classroom.name}`;
      } else {
        text =
          `${timeStart} - ${timeEnd} : ${teacher.familyName} - ` +
          `${classroom.name} (${subject.name})`;
      }
    } else if ($EventButtonType === 'Subject') {
      if (!width || width < 130) {
        text = `${timeStart} ${subject.name.substring(0, 1)}`;
      } else if (width < 240) {
        text = `${timeStart} ${subject.name} (${teacher.name})`;
      } else {
        text = `${timeStart} - ${timeEnd} : ${subject.name} (${teacher.name})`;
      }
    }
  }
</script>

<label
  class={className}
  for={modalId}
  style="color:{textColor};background-color:{backgroundColor};"
>
  {text}
</label>
<Modal {modalId} {event} />
