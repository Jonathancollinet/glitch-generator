<script setup lang="ts">
import G from "~/glitch/types";
import { duplicateRange, reverseRangeColors } from "~/utils/Editor/utils";

const ex1 = ref(getExempleRanges());

const ex1Copy = deepCopy(ex1.value);
duplicateRange(ex1Copy, 0);
reverseRangeColors(ex1Copy[1]);

const ex2 = ref(deepCopy(ex1Copy));

const ex2Copy = deepCopy(ex2.value);
ex2Copy[1][1].offsetFrame = 75;

const ex3 = ref(deepCopy(ex2Copy));

const ex4 = ref(
    deepCopy(ex3.value).map((range) => {
        range.forEach((field) => {
            let property: G.PropertyName;
            for (property in field.properties) {
                field.properties[property].fillAllFrames = true;
            }
        });

        return range;
    }),
);
</script>

<template>
    <div>
        <UiHeading variant="h2">{{
            $t("pages.help.keyframes.title")
        }}</UiHeading>
        <UiText>{{ $t("pages.help.keyframes.what") }}</UiText>
        <div class="mb-4 space-y-1 pl-4">
            <UiText as="div">- {{ $t("pages.help.keyframes.how") }}</UiText>
            <UiText as="div">- {{ $t("pages.help.keyframes.range") }}</UiText>
            <UiText as="div">- {{ $t("pages.help.keyframes.field") }}</UiText>
        </div>
        <UiText>{{ $t("pages.help.keyframes.multipleRanges") }}</UiText>
        <UiText>{{ $t("pages.help.keyframes.visualize") }}</UiText>
        <UiHeading variant="h3">{{
            $t("pages.help.keyframes.exempleTitle")
        }}</UiHeading>
        <UiText>{{ $t("pages.help.keyframes.exemple") }}</UiText>
        <PlaygroundWithKeyframes class="mb-8" name="ex1" :ranges="ex1" />
        <UiText>{{ $t("pages.help.keyframes.exemple2") }}</UiText>
        <PlaygroundWithKeyframes class="mb-8" name="ex2" :ranges="ex2" />
        <UiText>{{ $t("pages.help.keyframes.result2bis") }}</UiText>
        <UiText>{{ $t("pages.help.keyframes.exemple3") }}</UiText>
        <PlaygroundWithKeyframes class="mb-8" name="ex3" :ranges="ex3" />
        <UiText>{{ $t("pages.help.keyframes.fillExemple3result") }}</UiText>
        <UiText>{{ $t("pages.help.keyframes.introduceFill") }}</UiText>
        <UiHeading variant="h3">{{
            $t("pages.help.keyframes.fillTitle")
        }}</UiHeading>
        <div class="mb-4 sm:flex sm:space-x-4">
            <img class="mb-4" src="/help/kf_fill.png" />
            <div class="mt-2">
                <UiText>- {{ $t("pages.help.keyframes.fill") }}</UiText>
                <UiText>- {{ $t("pages.help.keyframes.fillExemple") }}</UiText>
                <UiText>- {{ $t("pages.help.keyframes.fillExemple2") }}</UiText>
            </div>
        </div>
        <UiText>{{ $t("pages.help.keyframes.fillExemple3resultbis") }}</UiText>
        <UiText>{{ $t("pages.help.keyframes.fillExemple4") }}</UiText>
        <PlaygroundWithKeyframes class="mb-8" name="ex4" :ranges="ex4" />
        <UiText>{{ $t("pages.help.keyframes.fillExemple4result") }}</UiText>
        <UiText>{{ $t("pages.help.keyframes.fillExemple4resultbis") }}</UiText>
        <UiText>{{ $t("pages.help.keyframes.fillDefault") }}</UiText>
        <UiText>{{ $t("pages.help.keyframes.fillImportant") }}</UiText>
        <UiHeading variant="h3">{{
            $t("pages.help.keyframes.considerations")
        }}</UiHeading>
        <UiText>{{ $t("pages.help.keyframes.mistakes") }}</UiText>
    </div>
</template>
