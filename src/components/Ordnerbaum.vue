<script setup lang="ts">
// Mia's folder tree, drawn from the data file mias-tablet for one stand of the story (1, 2, 3): the recurring picture
// of this explainer. Its look is that of the tree of lernapps/informatik-daten-codieren (#491, images/baum-zimmer.svg):
// root at the top, filled light blue, nodes as rounded boxes with a border of #333, leaves (files) dashed, edges as
// straight lines, white background. The names come from the props, so the picture is the same in every language.
// The logic (which nodes, where) is in Ordnerbaum.ts.
import { computed } from "vue";
import { layout, type Node } from "./Ordnerbaum.ts";

defineOptions({ nojs: "caption" });

const props = defineProps<{
  /** Every node of the data file mias-tablet. */
  nodes: Node[];
  /** How far the tree has grown: 1, 2 or 3. */
  stand: number;
}>();

const tree = computed(() => layout(props.nodes, props.stand));
</script>

<template>
  <svg
    class="ordnerbaum"
    :viewBox="`0 0 ${tree.width} ${tree.height}`"
    aria-hidden="true"
    font-family="sans-serif"
    font-size="12"
  >
    <rect :width="tree.width" :height="tree.height" fill="#fff" />
    <template v-for="node in tree.placed" :key="`edge-${node.id}`">
      <line
        v-if="node.from"
        :x1="node.from.x"
        :y1="node.from.y"
        :x2="node.x"
        :y2="node.y"
        stroke="#333"
        stroke-width="2"
      />
    </template>
    <g v-for="node in tree.placed" :key="node.id">
      <rect
        :x="node.x - node.width / 2"
        :y="node.y"
        :width="node.width"
        height="34"
        rx="8"
        :fill="node.root ? '#e8f0fb' : '#fff'"
        stroke="#333"
        stroke-width="2"
        :stroke-dasharray="node.datei ? '5 3' : undefined"
      />
      <path
        v-if="!node.datei && !node.root"
        :d="`M${node.x - node.width / 2 + 7} ${node.y + 12} h5 l2 2 h7 v9 h-14 z`"
        fill="#f2c14e"
        stroke="#333"
        stroke-width="1"
      />
      <text
        v-for="(line, i) in node.lines"
        :key="i"
        :x="node.x + (!node.datei && !node.root ? 8 : 0)"
        :y="node.y + (node.lines.length > 1 ? 15 + i * 12 : 21)"
        text-anchor="middle"
        fill="#222"
        :font-size="node.datei && line.length > 7 ? 10.5 : undefined"
        :font-weight="node.root ? 'bold' : undefined"
      >
        {{ line }}
      </text>
    </g>
  </svg>
</template>

<style scoped>
.ordnerbaum {
  display: block;
  width: 100%;
  max-width: 34rem;
  height: auto;
  margin: 1rem 0;
}
</style>
