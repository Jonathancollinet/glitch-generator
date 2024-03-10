export const tourSteps = [
    {
        target: '[data-v-step*="0"]',
        header: {
            title: 'Welcome to the Glitch Editor'
        },
        content: 'Glitch Generator allows you to create text/box shadow animations and get the result as a CSS Keyframe.<br><br>This tutorial will guide you through the different features.',
        params: {
            highlight: false
        }
    },
    {
        target: '[data-v-step="1"]',
        header: {
            title: 'Displayed text'
        },
        content: 'This area displays the animation result. There are action buttons and a bar to control the animation timing and play state.'
    },
    {
        target: '[data-v-step="2"]',
        header: {
            title: 'Animation controls'
        },
        content: 'This bar is the animation\'s control bar.<br><br>You can click inside or drag the cursor at any location.<br><br>Dragging facilitates frame transition\'s visualization.',
        params: {
            highlight: false
        }
    },
    {
        target: '[data-v-step="3"]',
        header: {
            title: 'Text & Container settings'
        },
        content: 'This area contains the styles settings.<br><br>You can change the text and his container properties.<br><br>Note: You have to open it by clicking on the title.',
        params: {
            placement: 'top'
        }
    },
    {
        target: '[data-v-step="4"]',
        header: {
            title: 'Animation settings'
        },
        content: 'This area contains the animation settings.<br><br>You can change the animation duration.<br><br>You see how it affects the reader?',
        params: {
            placement: 'top'
        }
    },
    {
        target: '[data-v-step*="5"]',
        header: {
            title: 'Ranges and fields'
        },
        content: 'This area contains the animation\'s frames.<br><br>The horizontal bar represent a range and can contain 101 fields maximum.<br><br>Each inner field represents one or more frames.'
    },
    {
        target: '[data-v-step*="6"]',
        header: {
            title: 'Select a field'
        },
        content: 'You can select a field by left-clicking on it.<br><br>Try it!'
    },
    {
        target: '[data-v-step="7"]',
        header: {
            title: 'Field configuration'
        },
        content: 'This area contains the field\'s properties.',
        params: {
            placement: 'top'
        }
    },
    {
        target: '[data-v-step="8"]',
        header: {
            title: 'Offset'
        },
        content: 'The offset represents where the field starts in the keyframe, in percentage.<br><br>Changing this will move the field in the range.<br><br>Note: you can only move it to the previous or next field, there are collisions.'
    },
    {
        target: '[data-v-step="9"]',
        header: {
            title: 'Properties'
        },
        content: 'In a field, you can enable any shadow properties.<br>When enabled, you can configure the shadow parameters.',
        params: {
            placement: 'top'
        }
    },
    {
        target: '[data-v-step="10"]',
        header: {
            title: 'Fill'
        },
        content: 'This button will fill all the frames with the current field values, starting from the field offset until the next field or range\'s end.'
    },
    {
        target: '[data-v-step*="11"]',
        header: {
            title: 'Split a field'
        },
        content: 'The only way to add and configure a field, is to cut existing one.<br><br>You can do this by right-clicking any place in the wanted range.<br><br>The new field will be placed at the mouse position and keep in memory every parameters of the hovered field.',
        params: {
            highlight: false
        }
    },
    {
        target: '[data-v-step*="12"]',
        header: {
            title: 'Split a field'
        },
        content: 'You can also maintain the right-click and drag the mouse in the range to choose a position.',
        params: {
            highlight: false
        }
    },
    {
        target: '[data-v-step*="14"]',
        header: {
            title: 'Resize a field'
        },
        content: 'You can resize a field by dragging the right/left-side of the field.'
    },
    {
        target: '[data-v-step="15"]',
        header: {
            title: 'Remove a field'
        },
        content: 'You can remove a field by clicking on the trash icon.'
    },
    {
        target: '[data-v-step*="16"]',
        header: {
            title: 'Add a range'
        },
        content: 'Now we have a configured range. There is two ways to add a new range.'
    },
    {
        target: '[data-v-step*="17"]',
        header: {
            title: 'Add a range'
        },
        content: 'You can add an empty range by clicking on the add action.',
        params: {
            highlight: false
        }
    },
    {
        target: '[data-v-step*="18"]',
        header: {
            title: 'Add a range'
        },
        content: 'Or you can duplicate a range by clicking on the duplicate action in range options.',
        params: {
            placement: 'top',
            highlight: false
        }
    },
    {
        target: '[data-v-step*="19"]',
        header: {
            title: 'Duplicate a range'
        },
        content: 'Duplicate a range will copy the range and all his fields.<br><br>It can be useful to create symmetrical animations.',
        params: {
            placement: 'top',
            highlight: false
        }
    },
    {
        target: '[data-v-step*="20"]',
        header: {
            title: 'Duplicate a range'
        },
        content: 'When duplicating a range, the range\'s options take all his sense.<br><br>You can reverse every x/y field\'s position, or reverse colors.<br><br>Give it a try on the duplicated range!',
        params: {
            placement: 'top',
            highlight: false
        }
    },
    {
        target: '[data-v-step="21"]',
        header: {
            title: 'Save your work'
        },
        content: 'You can save your animation by clicking on the plus action to create a custom preset.'
    },
    {
        target: '[data-v-step="22"]',
        header: {
            title: 'Great!'
        },
        content: 'Now your work is saved under a custom preset, you can reload the page without losing it.<br><br>Each time you edit a custom preset, the changes are saved automatically.<br><br>Be careful, the built-in presets can\'t be edited, so it\'s advised to immediatly create a custom preset from it to avoid any work loss.'
    },
    {
        target: '[data-v-step="23"]',
        header: {
            title: 'Export your animation'
        },
        content: 'You can export your animation by clicking on the export action.'
    },
    {
        target: '[data-v-step*="24"]',
        header: {
            title: 'Congratulations'
        },
        content: 'You are now ready to create your own animations.<br><br>Don\'t forget to read the Help\'s page for an in-depth understanding.<br><br>Thank you & enjoy!'
    }
];

export function setTourDone() {
    localStorage.setItem('tourDone', 'true');
}

export function isTourDone() {
    return localStorage.getItem('tourDone') === 'true';
}