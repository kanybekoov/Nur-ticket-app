<template>
  <div class="ticket-app">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-item selected"><i class="pi pi-ticket"></i> Tickets</div>
      <div class="sidebar-item"><i class="pi pi-chart-bar"></i> Dashboard</div>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <div class="tickets-header">
        <h1>Tickets</h1>
        <div class="tickets-header-actions">
            <button class="logout-btn" @click="logout">Log out</button>

      <!-- Status of Ticket -->
        <div class="tickets-controls">
          <select v-model="selectedStatus" class="status-select">
            <option value="">Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <input v-model="search" type="text" placeholder="Search..." class="search-input" />
          </div>
         </div>
      </div>

        <!--  List(Table) of tickets -->
      <table class="ticket-table">
        <thead>
          <tr>
            <thth>Id</thth>
            <th>Title</th>
            <th>Customer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr
                  v-for="ticket in pagedTickets"
                  :key="ticket.id"
                  @click="goToTicket(ticket.id)"
                  style="cursor:pointer"
                  >
                  <td>{{ ticket.id }}</td>
                  <td>{{ ticket.title }}</td>
                  <td>{{ ticket.customer }}</td>
                  <td>
                  <span :class="['status-tag', statusClass(ticket.status)]">{{ ticket.status }}</span>
                  </td>
            </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
            <button
            v-for="page in pageCount"
            :key="page"
            :class="{ active: page === currentPage }"
            @click="setPage(page)"
            >{{ page }}</button>
            <button @click="nextPage" :disabled="currentPage === pageCount">Next</button>
            <span class="page-info">{{ currentPage }} / {{ pageCount }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { tickets as ticketsData} from '../data/tickets.ts'

const tickets = ref(ticketsData)
const selectedStatus = ref('')
const search = ref('')

 //Function for select Status
function statusClass(status: string) {
  if (status === 'Open') return 'status-open'
  if (status === 'In Progress') return 'status-inprogress'
  if (status === 'Closed') return 'status-closed'
  return ''
}

const router = useRouter()

function logout() {
  router.push('/')
}

//Selected Ticket details 

function goToTicket(id: number) {
  router.push(`/tickets/${id}`)
}

// Below code for Pagination
const ticketsPerPage = 7
const currentPage = ref(1)

const filteredTickets = computed(() => {
  
  return tickets.value.filter(ticket => {
    const matchesStatus = !selectedStatus.value || ticket.status === selectedStatus.value
    const matchesSearch =
      !search.value ||
      ticket.title.toLowerCase().includes(search.value.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(search.value.toLowerCase()) ||
      ticket.id.toString().includes(search.value)
    return matchesStatus && matchesSearch
  })
})

const pageCount = computed(() => Math.ceil(filteredTickets.value.length / ticketsPerPage))

const pagedTickets = computed(() => {
  const start = (currentPage.value - 1) * ticketsPerPage
  return filteredTickets.value.slice(start, start + ticketsPerPage)
})

function nextPage() {
  if (currentPage.value < pageCount.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function setPage(page: number) {
  if (page >= 1 && page <= pageCount.value) currentPage.value = page
}
</script>

<style scoped>
.ticket-app {
  display: flex;
  height: 100vh;
  background: #f7f5f0;
}
.sidebar {
  width: 190px;
  background: linear-gradient(180deg, #23262f 70%, #3e4050 100%);
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100vh;
}
.sidebar-item {
  color: #fff;
  font-weight: 500;
  padding: 1rem 1.7rem;
  border-radius: 8px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  opacity: 0.85;
}
.sidebar-item.selected {
  background: #22232b;
  opacity: 1;
}
.sidebar-item:hover {
  background: #363945;
  opacity: 1;
}
.main-content {
  flex: 1;
  padding: 2.5rem 2.5rem;
  background: #f7f5f0;
}
.tickets-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}
.tickets-controls {
  display: flex;
  gap: 0.7rem;
}
.status-select, .search-input {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
}
.ticket-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.4rem;
  background: transparent;
}
.ticket-table th {
  text-align: left;
  color: #333;
  font-size: 1.07rem;
  font-weight: 600;
  padding-bottom: 0.7rem;
}
.ticket-table td {
  background: #fff;
  border-radius: 8px;
  padding: 1.05rem 1.2rem;
  font-size: 1rem;
}
.status-tag {
  display: inline-block;
  padding: 0.35em 1em;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
}
.status-open {
  background: #e6f6ea;
  color: #166534;
}
.status-inprogress {
  background: #dbeafe;
  color: #2563eb;
}
.status-closed {
  background: #c08181bd;
  color: #141412;
}

.tickets-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.2rem;
}

.tickets-header-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.logout-btn {
  background: #3eb0e5;
  color: #fff;
  border: none;
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 0.2rem;
  transition: background 0.18s;
}
.logout-btn:hover {
  background: #c53030;
}
.pagination {
  margin-top: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.pagination button {
  padding: 0.4rem 0.9rem;
  border: none;
  background: #ececec;
  color: #222;
  border-radius: 7px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.13s;
}
.pagination button.active, .pagination button:hover {
  background: #6366f1;
  color: #fff;
}
.pagination button:disabled {
  background: #e2e2e2;
  color: #aaa;
  cursor: not-allowed;
}
.page-info {
  margin-left: 0.8rem;
  color: #808080;
  font-size: 0.98rem;
}

</style>
