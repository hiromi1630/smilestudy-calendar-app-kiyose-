<script lang="ts">
  import { EventButtonType } from './../../stores/Calendar';
  import Modal from './Modal.svelte';
  import type { CalendarEvent } from '../../types';
  import { getTextColor, ColorCode } from '../../utils/getTextContrast';
  import { HSLToRGB, stringToNumber } from '../../utils/hslToRgb';

  export let event: CalendarEvent;

  let text = '';
  let className = 'btn btn-block btn-xs border-0';

  $: modalId = `modal-${event.id}`;

  // bind control
  let width: number | undefined;

  const createBackgroundColor = () =>
    $EventButtonType === 'Subject'
      ? HSLToRGB(stringToNumber(event.subject.name), 70, 58)
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
      } else if (width < 420) {
        text = `${teacher.familyName} - ${classroom.name}`;
      } else {
        text =
          `${timeStart} - ${timeEnd} : ${teacher.familyName} - ` +
          `${classroom.name} (${subject.name})`;
      }
    } else if ($EventButtonType === 'Subject') {
      if (!width || width < 130) {
        text = `${timeStart} ${subject.name}`;
      } else if (width < 420) {
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
  bind:clientWidth={width}
  style="color:{textColor};background-color:{backgroundColor};"
>
  {text}
</label>
<Modal {modalId} {event} />
