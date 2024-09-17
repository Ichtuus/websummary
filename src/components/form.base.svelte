<form>
	<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
		<slot name="body" />

		<div class="fixed bottom-4 right-4">
			<div class="footer">
				<slot name="footer" />
			</div>
		</div>
	</div>
</form>
