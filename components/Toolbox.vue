<script setup lang="ts">
import { z } from 'zod';
import type { Config } from '~/types/config';

type ConfigKeys = keyof Config;

const config = defineModel<Config>({ type: Object });
const localConfig = reactive({ ...config.value });

const schema: Record<ConfigKeys, z.ZodSchema> = {
    fontSize: z.coerce.number().gte(1).lte(128),
    color: z.string()
};

// errors object to store the validation errors
const errors: Partial<Record<ConfigKeys, string>> = reactive({});

// custom getter to get the value from the localConfig or default values in the config
// localConfig is used to store the value of the input field
// and is persistant in case of an error or empty value
function getValue(propertyKey: ConfigKeys) {
    if (localConfig.hasOwnProperty(propertyKey)) {
        return localConfig[propertyKey];
    }
    if (config?.value?.hasOwnProperty(propertyKey)) {
        return config.value[propertyKey];
    }
    return "";
}

// custom update function to update the localConfig and config
// this function controls if the directive is re-rendered or not
// by re-assigning the value to the config
function updateConfig(propertyKey: ConfigKeys) {
    return (value: string) => {

        // checks that the config and localConfig are really defined
        if (config.value && localConfig) {

            // we want to reset the error in case there was one and is now (maybe?) fixed
            errors[propertyKey] = '';

            // we assign the value to the localConfig to not loose the value in case of an error
            localConfig[propertyKey] = value;

            // we want to avoid null | undefined | '' | NaN
            // other falsy values are allowed like 0 or false
            if (isNotFalsy(value)) {

                // we call the zod validation for the propertyKey
                // safe parse will not throw an error, but will return a result object
                const propertyValidation = schema[propertyKey].safeParse(value);

                if (propertyValidation.success) {

                    // if the validation was successful, we assign the value to the config
                    // this will trigger the watcher in the DisplayedText component
                    // and the directive will be re-rendered
                    config.value[propertyKey] = value;

                } else {

                    // if the validation was not successful, we assign the issue to the errors object
                    // the error value is a string destinated for i18n
                    const issues = propertyValidation.error?.issues;

                    if (issues.length) {
                        // if there is an issue, we precise the error message with the code 
                        const code = issues[0].code;

                        errors[propertyKey] = `errors.configValidation.${propertyKey}.${code}`;
                    } else {
                        // if there isn't any issue, we assign a default error message
                        errors[propertyKey] = `errors.configValidation.${propertyKey}.default`;
                    }
                }
            }
        }
    }
}

</script>

<template>
    <div v-if="config">
        <UiFormGroup label="pages.editor.config.fontSize" :error="errors.fontSize" name="fontSize">
            <UiInput debounce :debounceTime="300" :debounceFn="updateConfig('fontSize')" name="fontSize" :modelValue="getValue('fontSize')" />
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.color" :error="errors.color" name="color">
            <UiInput type="text" debounce :debounceTime="300" :debounceFn="updateConfig('color')" name="color" :modelValue="getValue('color')" />
        </UiFormGroup>
    </div>
    <div v-else>
        Oops.. config is not defined :/
    </div>
</template>
