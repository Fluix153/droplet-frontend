export abstract class BaseAssembler<TDomain, TDto> {
    abstract fromDto(dto: TDto): TDomain;
    abstract toDto(domain: TDomain): TDto;
}
