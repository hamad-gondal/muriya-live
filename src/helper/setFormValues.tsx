export const setFormValue = async (eventDetails: any) => {

    if (window && eventDetails[0]) {
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('input[name="name"]').value = eventDetails[0].name || '';
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('select[name="location"]').value = eventDetails[0].location.location || '';
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('select[name="location"]').disabled = true;
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('input[name="startDate"]').value = (new Date(eventDetails[0].eventStart.date)).toISOString().substring(0, 10) || new Date();
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('input[name="startTime"]').value = eventDetails[0].eventStart.time || '';
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('input[name="endTime"]').value = eventDetails[0].eventEnd.time || '';
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('input[name="phone"]').value = eventDetails[0].phone || '';
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('input[name="booking"]').value = eventDetails[0].booking || '';
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('#description').value = eventDetails[0].description || '';
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('#imageToUpload').dataset.src = eventDetails[0].image || '';
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('#imageToUpload').dataset.id = eventDetails[0].id || '';
        // @ts-ignore: Object is possibly 'null'.
        window.document.querySelector('input[name="venue"]').value = eventDetails[0].location.venue || '';
    }
};