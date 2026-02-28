// FullFeatureTable.tsx
import {
  type ColumnDef,
  type ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  useReactTable,
  type VisibilityState
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownToLine,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Eye,
  EyeOff,
  Filter,
  Pencil,
  Search,
  Trash2,
  X
} from 'lucide-react';
import React, { useMemo, useRef, useState } from "react";

type Person = {
  id: number;
  name: string;
  age: number;
  email: string;
  address: string;
};
type parentColumnProps = {
  header:string |React.JSX.Element,
  accessorKey:string,
  footer?:()=> string | number|   React.JSX.Element,
  cell?:()=>string | number | React.JSX.Element

}

type Props = {
  data: Person[];
  parentColumn:parentColumnProps[]
  handleEdit?: (person: Person) => void;
  handleDelete?: (person: Person) => void;
  handleDownload?: (person: Person) => void;  
  showEdit?: boolean;
  showDelete?: boolean;
  showDownload?: boolean; 
};

const FullFeatureTable = ({ data ,parentColumn,handleEdit,handleDelete,handleDownload,showDelete=false,showDownload=false,showEdit=false }: Props) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [expanded, setExpanded] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [columnSizing, setColumnSizing] = useState({});

  const Selectcolumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <input
              type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
            />
          </motion.div>
        ),
        cell: ({ row }) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
            />
          </motion.div>
        ),
        size: 50,
      }
    
    ],
    []
  );

  const ActionColumns = useMemo(() => {
  const actionColumn = {
    id: "actions",
    header: () => <span className="text-purple-300 font-semibold">Actions</span>,
    cell: ({ row }: any) => (
      <div className="flex items-center justify-start gap-3">
         {showDownload && (
           <motion.button
             onClick={() => handleDownload && handleDownload(row.original)}
             className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-all duration-200"
             whileHover={{ scale: 1.1, y: -2 }}
             whileTap={{ scale: 0.9 }}
             title="Download"
           >
             <ArrowDownToLine className="w-4 h-4" />
           </motion.button>
         )}
         {showEdit && (
           <motion.button
             onClick={() => handleEdit && handleEdit(row.original)}
             className="p-2 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded-lg transition-all duration-200"
             whileHover={{ scale: 1.1, y: -2 }}
             whileTap={{ scale: 0.9 }}
             title="Edit"
           >
             <Pencil className="w-4 h-4" />
           </motion.button>
         )}
         {showDelete && (
           <motion.button
             onClick={() => handleDelete && handleDelete(row.original)}
             className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-200"
             whileHover={{ scale: 1.1, y: -2 }}
             whileTap={{ scale: 0.9 }}
             title="Delete"
           >
             <Trash2 className="w-4 h-4" />
           </motion.button>
         )}
      </div>
    ),
    size: 120,
  };
  if (!parentColumn) {
    return [...Selectcolumns, actionColumn];
  } else {
    return [...Selectcolumns, ...parentColumn as any, actionColumn];
  }
}, [parentColumn]);

    const columns = useMemo(() => {
      if(!parentColumn){
        return   [...Selectcolumns]
      }else{
       return [...ActionColumns] as any
      }
        
      
     }, [parentColumn, ActionColumns, Selectcolumns]);
  

  const parentRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange' as ColumnResizeMode,
    state: {
      globalFilter,
      rowSelection,
      columnVisibility,
      expanded,
      columnSizing,
    },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    onColumnSizingChange: setColumnSizing,
    enableRowSelection: true,
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    debugTable: false,
  });

  const rows = table.getRowModel().rows;
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  return (
    <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden">
      {/* Enhanced Header Section */}
      <div className="p-6 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-b border-gray-700/50">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          
          {/* Enhanced Search Bar */}
          <motion.div 
            className="relative flex-1 max-w-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={clsx(
              "relative group",
              searchFocused && "scale-105"
            )}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors duration-200 w-5 h-5" />
              <input
                className={clsx(
                  "w-full pl-12 pr-4 py-3 bg-gray-800/60 border rounded-xl text-white placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400",
                  "transition-all duration-300 backdrop-blur-sm",
                  searchFocused 
                    ? "border-purple-400 bg-gray-800/80 shadow-lg shadow-purple-500/20" 
                    : "border-gray-600 hover:border-gray-500"
                )}
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search all columns..."
              />
              {globalFilter && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                  onClick={() => setGlobalFilter("")}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Enhanced Filter Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.button
              className={clsx(
                "flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300",
                "bg-gradient-to-r from-purple-600/80 to-indigo-600/80",
                "hover:from-purple-600 hover:to-indigo-600",
                "border border-purple-500/30 hover:border-purple-400/50",
                "text-white font-medium shadow-lg",
                showFilters && "ring-2 ring-purple-400/50"
              )}
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4" />
              Column Filters
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Column Visibility Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700/50 backdrop-blur-sm"
            >
              <h3 className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Column Visibility
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {table.getAllLeafColumns().map((column) => (
                  <motion.label
                    key={column.id}
                    className={clsx(
                      "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200",
                      "hover:bg-gray-700/50 text-sm",
                      column.getIsVisible() ? "text-white" : "text-gray-400"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="capitalize">
                      {column.id === 'select' ? 'Select' : column.id}
                    </span>
                    {column.getIsVisible() ? (
                      <Eye className="w-3 h-3 text-green-400" />
                    ) : (
                      <EyeOff className="w-3 h-3 text-gray-500" />
                    )}
                  </motion.label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Table Container */}
      <div className="relative overflow-hidden">
        <div 
          className="overflow-auto max-h-[500px] scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-purple-600 scrollbar-thumb-rounded-full" 
          ref={parentRef}
        >
          <table 
            className="min-w-full table-fixed"
            style={{ width: table.getCenterTotalSize() }}
          >
            {/* Enhanced Table Header */}
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup, index) => (
                <motion.tr
                  key={headerGroup.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700"
                >
                  {headerGroup.headers.map((header) => (
                    <motion.th
                      key={header.id}
                      className={clsx(
                        "px-6 py-4 text-left font-semibold text-gray-200 relative",
                        "border-r border-gray-700/50 last:border-r-0",
                        "hover:bg-gray-700/30 transition-all duration-200",
                        header.column.getCanSort() && "cursor-pointer select-none"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ 
                        width: header.getSize(),
                        position: 'relative'
                      }}
                      whileHover={header.column.getCanSort() ? { 
                        backgroundColor: "rgba(75, 85, 99, 0.3)",
                        scale: 1.02 
                      } : {}}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-purple-200">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        {header.column.getCanSort() && (
                          <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {header.column.getIsSorted() === 'asc' && (
                              <ChevronUp className="w-4 h-4 text-purple-400" />
                            )}
                            {header.column.getIsSorted() === 'desc' && (
                              <ChevronDown className="w-4 h-4 text-purple-400" />
                            )}
                            {!header.column.getIsSorted() && (
                              <div className="w-4 h-4 opacity-50">
                                <ChevronUp className="w-3 h-3 text-gray-500" />
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Column Resizer */}
                      {header.column.getCanResize() && (
                        <motion.div
                          className={clsx(
                            "absolute right-0 top-0 h-full w-1 cursor-col-resize",
                            "bg-transparent hover:bg-purple-500/50 transition-colors duration-200",
                            "group"
                          )}
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          whileHover={{ 
                            backgroundColor: "rgba(147, 51, 234, 0.5)",
                            width: "3px"
                          }}
                        >
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
                        </motion.div>
                      )}
                    </motion.th>
                  ))}
                </motion.tr>
              ))}
            </thead>

            {/* Enhanced Table Body */}
            <tbody style={{ height: `${totalSize}px`, position: "relative" }}>
              {virtualRows.map((virtualRow, index) => {
                const row = rows[virtualRow.index];
                return (
                  <React.Fragment key={row.id}>
                    <motion.tr
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className={clsx(
                        "border-b border-gray-700/50 transition-all duration-300",
                        "hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-indigo-900/20",
                        "hover:shadow-lg hover:shadow-purple-500/10",
                        "group cursor-pointer"
                      )}
                      style={{
                        alignSelf: "start",
                        top: 0,
                        width: "100%",
                      }}
                      whileHover={{ scale: 1.01, y: -1 }}
                    >
                      {row.getVisibleCells().map((cell, cellIndex) => (
                        <motion.td
                          key={cell.id}
                          className={clsx(
                            "px-6 py-4 text-gray-300 border-r border-gray-700/30 last:border-r-0",
                            "group-hover:text-white transition-colors duration-200"
                          )}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: (index * 0.05) + (cellIndex * 0.02) }}
                        >
                          <div className="flex items-center">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </motion.td>
                      ))}
                    </motion.tr>

                    {/* Enhanced Expanded Row */}
                    {row.getIsExpanded() && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                          position: "absolute",
                          top: 0,
                          transform: `translateY(${virtualRow.start + 56}px)`,
                          width: "100%",
                        }}
                      >
                        <td 
                          colSpan={row.getVisibleCells().length} 
                          className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-lg"
                        >
                          <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm">
                            <pre className="text-xs text-gray-300 overflow-auto max-h-40 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-purple-600">
                              {JSON.stringify(row.original, null, 2)}
                            </pre>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Pagination */}
      <motion.div 
        className="p-6 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-t border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                table.getCanPreviousPage()
                  ? "bg-purple-600/80 hover:bg-purple-600 text-white shadow-lg hover:shadow-purple-500/25"
                  : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
              )}
              whileHover={table.getCanPreviousPage() ? { scale: 1.05, x: -2 } : {}}
              whileTap={table.getCanPreviousPage() ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </motion.button>
            
            <motion.button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                table.getCanNextPage()
                  ? "bg-purple-600/80 hover:bg-purple-600 text-white shadow-lg hover:shadow-purple-500/25"
                  : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
              )}
              whileHover={table.getCanNextPage() ? { scale: 1.05, x: 2 } : {}}
              whileTap={table.getCanNextPage() ? { scale: 0.95 } : {}}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Page Info */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-300">
              Page{" "}
              <span className="font-semibold text-purple-300">
                {table.getState().pagination.pageIndex + 1}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-purple-300">
                {table.getPageCount()}
              </span>
            </span>
            
            {/* Rows Selected Info */}
            {Object.keys(rowSelection).length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full"
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-purple-300 text-xs font-medium">
                  {Object.keys(rowSelection).length} selected
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FullFeatureTable;
