<template>
  <el-table-column v-if="itemProp?.slot && itemProp.show" v-bind="itemProp" align="center" show-overflow-tooltip>
    <template #default="scope">
      <slot :name="itemProp.slot" :row="scope.row" />
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="itemProp?.childrenColumns && itemProp.childrenColumns.length && itemProp.show"
    v-bind="itemProp"
    align="center"
  >
    <table-column v-for="childrenItem in itemProp.childrenColumns" :key="childrenItem.id" :item-prop="childrenItem">
      <template v-for="slot in Object.keys(slots)" #[slot]="data" :key="slot">
        <slot :name="slot" v-bind="data" />
      </template>
    </table-column>
  </el-table-column>
  <el-table-column v-else-if="itemProp?.show" v-bind="itemProp" align="center" show-overflow-tooltip />
</template>
<script lang="ts" setup>
import { columnProps } from '@/types/elComponent'
interface IColumnProps {
  itemProp: columnProps | null
}
withDefaults(defineProps<IColumnProps>(), { itemProp: null })
const slots = useSlots()
</script>
<style lang="scss" scoped></style>
