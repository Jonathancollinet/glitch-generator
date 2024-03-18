<script lang="ts" setup>
import G from "~/lib/glitch/types";
import { getErrorMessage, applyUpdater } from "~/lib/toolbox/utils";

const props = defineProps<{
    errors: Partial<G.Errors>;
}>();

const config = defineModel<G.BaseText>("config", { required: true });
const localConfig = defineModel<G.BaseText>("localConfig", {
    required: true,
});

const textSizeError = computed(() =>
    getErrorMessage(props.errors, "text.size", true),
);
const textMessageError = computed(() =>
    getErrorMessage(props.errors, "text.message"),
);
const textPaddingError = computed(() =>
    getErrorMessage(props.errors, "text.padding"),
);
const textBorderRadiusError = computed(() =>
    getErrorMessage(props.errors, "text.borderRadius"),
);
const textHeightError = computed(() =>
    getErrorMessage(props.errors, "text.height"),
);

const updateText = applyUpdater<G.BaseText>({
    obj: config.value,
    localObj: localConfig.value,
});

const updateTextSize = updateText({
    key: "size",
    modifier: Number,
    debounced: 100,
});

const updateMessage = updateText({
    key: "message",
    debounced: 100,
});

const updatePadding = updateText({
    key: "padding",
    modifier: Number,
    debounced: 100,
});

const updateBorderRadius = updateText({
    key: "borderRadius",
    modifier: Number,
    debounced: 100,
});

const updateHeight = updateText({
    key: "height",
    modifier: Number,
    debounced: 100,
});
</script>

<template>
    <UiCard openable content-classes="border-0 ml-0 px-0" :is-open="false">
        <template #title>
            <UiHeading variant="h3">{{
                $t("pages.editor.config.text.title")
            }}</UiHeading>
        </template>

        <template #content>
            <UiHeading class="mt-0" variant="h4">Text</UiHeading>
            <UiCard openable content-classes="pr-0">
                <template #content>
                    <UiFormGroup
                        class="ml-0 w-full"
                        inline
                        size="tiny"
                        label="pages.editor.config.text.fontSize"
                        :error="textSizeError"
                        name="textSize"
                    >
                        <UiInput
                            class="w-[40px]"
                            alignment="center"
                            type="tel"
                            :on-update="updateTextSize"
                            name="textSize"
                            :model-value="localConfig.size"
                        />
                    </UiFormGroup>
                    <EditorToolboxPropertyColor
                        v-model:config="config.color"
                        v-model:localConfig="localConfig.color"
                        class="ml-0"
                        name="textColor"
                        :errors="errors"
                    />
                    <UiFormGroup
                        class="ml-0"
                        :error="textMessageError"
                        name="message"
                    >
                        <UiInput
                            :on-update="updateMessage"
                            name="message"
                            :model-value="localConfig.message"
                        />
                    </UiFormGroup>
                </template>
            </UiCard>
            <UiHeading variant="h4">Container</UiHeading>
            <UiCard openable content-classes="pr-0">
                <template #content>
                    <UiFormGroup
                        class="ml-0 w-full"
                        inline
                        size="tiny"
                        label="pages.editor.config.text.height"
                        :error="textHeightError"
                        name="textHeight"
                    >
                        <UiInput
                            class="w-[40px]"
                            alignment="center"
                            type="tel"
                            :on-update="updateHeight"
                            name="textHeight"
                            :model-value="localConfig.height"
                        />
                    </UiFormGroup>
                    <UiFormGroup
                        class="ml-0 w-full"
                        inline
                        size="tiny"
                        label="pages.editor.config.text.padding"
                        :error="textPaddingError"
                        name="textPadding"
                    >
                        <UiInput
                            class="w-[40px]"
                            alignment="center"
                            type="tel"
                            :on-update="updatePadding"
                            name="textPadding"
                            :model-value="localConfig.padding"
                        />
                    </UiFormGroup>
                    <UiFormGroup
                        class="ml-0 w-full"
                        inline
                        size="tiny"
                        label="pages.editor.config.text.borderRadius"
                        :error="textBorderRadiusError"
                        name="textBorderRadius"
                    >
                        <UiInput
                            class="w-[40px]"
                            alignment="center"
                            type="tel"
                            :on-update="updateBorderRadius"
                            name="textBorderRadius"
                            :model-value="localConfig.borderRadius"
                        />
                    </UiFormGroup>
                    <EditorToolboxPropertyColor
                        v-model:config="config.bgColor"
                        v-model:localConfig="localConfig.bgColor"
                        class="ml-0"
                        name="textBgColor"
                        :errors="errors"
                    />
                </template>
            </UiCard>
        </template>
    </UiCard>
</template>
