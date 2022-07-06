<script lang="ts" setup>
import { columnProps } from '@/types/elComponent'
interface IColumnProps {
  itemProp: columnProps
}
withDefaults(defineProps<IColumnProps>(), {})
const slots = useSlots()
</script>
<template>
  <el-table-column
    v-if="itemProp?.contentRender && itemProp.show"
    v-bind="itemProp"
    align="center"
    show-overflow-tooltip
  >
    <template v-if="itemProp.headerRender" #header
      ><component :is="itemProp.headerRender" :row="itemProp"></component
    ></template>
    <template #default="scope">
      <component :is="itemProp.contentRender" :data="scope"></component>
    </template>
  </el-table-column>
  <el-table-column v-else-if="itemProp?.slot && itemProp.show" v-bind="itemProp" align="center" show-overflow-tooltip>
    <template v-if="itemProp.headerRender" #header
      ><component :is="itemProp.headerRender" :row="itemProp"></component
    ></template>
    <template #default="scope">
      <slot :name="itemProp.slot" :row="scope.row" />
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="itemProp?.childrenColumns && itemProp.childrenColumns.length && itemProp.show"
    v-bind="itemProp"
    align="center"
  >
    <template v-if="itemProp.headerRender" #header
      ><component :is="itemProp.headerRender" :row="itemProp"></component
    ></template>
    <table-column v-for="childrenItem in itemProp.childrenColumns" :key="childrenItem.id" :item-prop="childrenItem">
      <template v-for="slot in Object.keys(slots)" #[slot]="data" :key="slot">
        <slot :name="slot" v-bind="data" />
      </template>
    </table-column>
  </el-table-column>
  <el-table-column v-else-if="itemProp?.show" v-bind="itemProp" align="center" show-overflow-tooltip>
    <template v-if="itemProp.headerRender" #header
      ><component :is="itemProp.headerRender" :row="itemProp"></component
    ></template>
  </el-table-column>
</template>
